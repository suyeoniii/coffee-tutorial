import { google } from 'googleapis';
import { Recipe, Bean, BrewingStep } from '../types/recipe';

const config = {
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
  privateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  sheetId: process.env.GOOGLE_SHEET_ID || '',
  sheetNames: {
    beans: 'Beans',
    recipes: 'Recipes',
    detailedSteps: 'DetailedSteps'
  }
};

// 구글 시트에서 데이터 가져오기
async function getSheetData(sheetName: string): Promise<any[][]> {
  if (!config.clientEmail || !config.privateKey || !config.sheetId) {
    throw new Error('구글 시트 환경 변수가 설정되지 않았습니다.');
  }

  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.sheetId,
    range: `${sheetName}!A:Z`,
  });

  const rows = response.data.values || [];
  console.log(`✅ ${sheetName}: ${rows.length}개 행`);
  return rows;
}

// 헤더 구조 감지
function detectHeaderStructure(headers: string[]): { hasId: boolean } {
  return { hasId: headers[0] === 'id' };
}

// 원두 데이터 파싱
function parseBeansData(rows: any[][]): Bean[] {
  if (rows.length < 2) return [];
  
  const [headers, ...dataRows] = rows;
  const { hasId } = detectHeaderStructure(headers);
  
  const beans = dataRows
    .map((row, index) => {
      const nameIndex = hasId ? 1 : 0;
      if (!row[nameIndex]) return null;
      
      return {
        name: row[nameIndex] || `원두 ${index + 1}`,
        description: row[nameIndex + 1] || '구글 시트에서 가져온 원두입니다.',
        notes: row[nameIndex + 2] ? row[nameIndex + 2].split(',').map((note: string) => note.trim()) : ['향미 노트'],
        origin: row[nameIndex + 3] || '미상',
        imageUrl: row[nameIndex + 4] || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      };
    })
    .filter((bean): bean is Bean => bean !== null);
  
  console.log(`🫘 ${beans.length}개 원두`);
  return beans;
}

// 상세 단계 데이터 파싱
function parseDetailedStepsData(rows: any[][]): { [recipeId: string]: BrewingStep[] } {
  if (rows.length < 2) return {};
  
  const [headers, ...dataRows] = rows;
  const { hasId } = detectHeaderStructure(headers);
  const stepsData: { [recipeId: string]: BrewingStep[] } = {};
  
  dataRows.forEach(row => {
    const recipeNameIndex = hasId ? 1 : 0;
    const recipeId = row[recipeNameIndex];
    if (!recipeId) return;
    
    if (!stepsData[recipeId]) {
      stepsData[recipeId] = [];
    }
    
    stepsData[recipeId].push({
      title: row[recipeNameIndex + 1] || '',
      timeAndAmount: row[recipeNameIndex + 2] || '',
      description: row[recipeNameIndex + 3] || ''
    });
  });
  
  const totalSteps = Object.values(stepsData).reduce((sum, steps) => sum + steps.length, 0);
  if (totalSteps > 0) {
    console.log(`📖 ${totalSteps}개 상세 단계`);
  }
  
  return stepsData;
}

// 레시피 데이터 파싱
function parseRecipesData(rows: any[][], beansData: Bean[], stepsData: { [recipeId: string]: BrewingStep[] }): Recipe[] {
  if (rows.length < 2) return [];
  
  const [headers, ...dataRows] = rows;
  const { hasId } = detectHeaderStructure(headers);
  
  const recipes = dataRows
    .map((row, index) => {
      const nameIndex = hasId ? 1 : 0;
      if (!row[nameIndex]) return null;
      
      const baseIndex = hasId ? 0 : -1;
      
      const recipe: Recipe = {
        id: hasId ? (row[0] || `recipe-${index + 1}`) : `recipe-${index + 1}`,
        name: row[nameIndex] || `레시피 ${index + 1}`,
        type: (row[nameIndex + 1] && row[nameIndex + 1].trim()) ? 
          (row[nameIndex + 1].trim() as 'preset' | 'custom') : 'preset',
        description: row[nameIndex + 2] || '구글 시트에서 가져온 레시피입니다.',
        temperature: (row[nameIndex + 3] && row[nameIndex + 3].trim()) ? 
          (row[nameIndex + 3].trim() as '따뜻' | '아이스') : '따뜻',
        difficulty: (row[nameIndex + 4] && row[nameIndex + 4].trim()) ? 
          (row[nameIndex + 4].trim() as '초급' | '중급' | '고급') : '초급',
        method: row[nameIndex + 5] || '푸어오버',
        dripper: row[nameIndex + 6] || 'V60',
        imageUrl: row[nameIndex + 7] || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        brewingParams: {
          beanAmount: row[nameIndex + 8] || '20g',
          grindSize: row[nameIndex + 9] || '중간',
          waterTemperature: row[nameIndex + 10] || '93°C',
          waterAmount: row[nameIndex + 11] || '300ml',
          brewTime: row[nameIndex + 12] || '3분'
        },
        recommendedBeans: [],
        steps: row[nameIndex + 13] ? 
          row[nameIndex + 13].split('|').map((step: string) => step.trim()) : 
          ['물을 붓고 추출합니다.'],
        detailedSteps: stepsData[row[nameIndex]] || undefined
      };

      // 추천 원두 설정 (프리셋 레시피용)
      const recommendedBeansIndex = nameIndex + 25;
      if (recipe.type === 'preset' && row[recommendedBeansIndex]) {
        const recommendedBeanNames = row[recommendedBeansIndex].split(',').map((name: string) => name.trim());
        recipe.recommendedBeans = beansData.filter(bean => 
          recommendedBeanNames.includes(bean.name)
        );
      }

      // 타겟 원두 및 맛 프로필 설정 (커스텀 레시피용)
      if (recipe.type === 'custom') {
        const targetBeanIndex = nameIndex + 24;
        if (row[targetBeanIndex]) {
          const targetBean = beansData.find(bean => bean.name === row[targetBeanIndex]);
          if (targetBean) {
            recipe.targetBean = targetBean;
          }
        }
        
        const profileStartIndex = nameIndex + 19;
        if (row[profileStartIndex] || row[profileStartIndex + 1] || row[profileStartIndex + 2] || row[profileStartIndex + 3]) {
          recipe.tasteProfile = {
            acidity: parseInt(row[profileStartIndex]) || 3,
            body: parseInt(row[profileStartIndex + 1]) || 3,
            sweetness: parseInt(row[profileStartIndex + 2]) || 3,
            bitterness: parseInt(row[profileStartIndex + 3]) || 3
          };
        }
        
        const memoIndex = nameIndex + 23;
        if (row[memoIndex]) {
          recipe.memo = row[memoIndex];
        }
      }

      return recipe;
    })
    .filter((recipe): recipe is Recipe => recipe !== null);
  
  const presetCount = recipes.filter(r => r.type === 'preset').length;
  const customCount = recipes.filter(r => r.type === 'custom').length;
  console.log(`☕ ${recipes.length}개 레시피 (프리셋: ${presetCount}, 커스텀: ${customCount})`);
  
  return recipes;
}

// 메인 함수들
export async function fetchBeansFromSheets(): Promise<Bean[]> {
  try {
    const rows = await getSheetData(config.sheetNames.beans);
    return parseBeansData(rows);
  } catch (error) {
    console.error('💥 원두 데이터 가져오기 실패:', error);
    throw error;
  }
}

export async function fetchRecipesFromSheets(): Promise<Recipe[]> {
  try {
    // 상세 단계 데이터 (선택사항)
    let stepsData: { [recipeId: string]: BrewingStep[] } = {};
    try {
      const stepsRows = await getSheetData(config.sheetNames.detailedSteps);
      stepsData = parseDetailedStepsData(stepsRows);
    } catch {
      // 무시
    }

    // 원두 데이터 (선택사항)
    let beansData: Bean[] = [];
    try {
      beansData = await fetchBeansFromSheets();
    } catch {
      // 무시
    }

    // 레시피 데이터
    const recipesRows = await getSheetData(config.sheetNames.recipes);
    return parseRecipesData(recipesRows, beansData, stepsData);
  } catch (error) {
    console.error('💥 레시피 데이터 가져오기 실패:', error);
    throw error;
  }
}

// 외부 인터페이스
export const getCachedRecipes = fetchRecipesFromSheets;
export const getCachedBeans = fetchBeansFromSheets; 