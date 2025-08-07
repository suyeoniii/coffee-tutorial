import { google } from 'googleapis';
import { Recipe, Bean, BrewingStep } from '../types/recipe';

// 환경 변수 확인 및 로깅
console.log('🔧 구글 시트 환경 변수 확인:');
console.log('- GOOGLE_CLIENT_EMAIL:', !!process.env.GOOGLE_CLIENT_EMAIL);
console.log('- GOOGLE_PRIVATE_KEY:', !!process.env.GOOGLE_PRIVATE_KEY);
console.log('- GOOGLE_SHEET_ID:', !!process.env.GOOGLE_SHEET_ID);

const config = {
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
  privateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  sheetId: process.env.GOOGLE_SHEET_ID || '',
  beansSheetName: 'Beans',
  recipesSheetName: 'Recipes', 
  detailedStepsSheetName: 'DetailedSteps'
};

// 구글 시트 연결 설정
async function getSheetData(sheetName: string): Promise<any[][]> {
  console.log(`📊 구글 시트 '${sheetName}' 데이터 요청 시작...`);
  
  if (!config.clientEmail || !config.privateKey || !config.sheetId) {
    throw new Error('구글 시트 환경 변수가 설정되지 않았습니다.');
  }

  try {
    const auth = new google.auth.JWT({
      email: config.clientEmail,
      key: config.privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    console.log(`🔐 인증 설정 완료`);

    const sheets = google.sheets({ version: 'v4', auth });
    console.log(`📋 시트 API 클라이언트 생성 완료`);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.sheetId,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values || [];
    console.log(`✅ '${sheetName}' 시트에서 ${rows.length}개 행 가져왔습니다.`);
    
    // 첫 몇 행 로깅 (개인정보 제외)
    if (rows.length > 0) {
      console.log(`📝 헤더:`, rows[0]);
      if (rows.length > 1) {
        console.log(`📝 첫 번째 데이터 행:`, rows[1]?.map((cell, index) => 
          index < 3 ? cell : cell ? '[데이터 있음]' : '[비어있음]'
        ));
      }
    }

    return rows;
  } catch (error) {
    console.error(`❌ '${sheetName}' 시트 데이터 가져오기 실패:`, error);
    throw error;
  }
}

// 원두 데이터 파싱
function parseBeansData(rows: any[][]): Bean[] {
  console.log(`🫘 원두 데이터 파싱 시작... (${rows.length}개 행)`);
  
  if (rows.length < 2) {
    console.log('⚠️ 원두 데이터가 충분하지 않습니다.');
    return [];
  }
  
  const [headers, ...dataRows] = rows;
  console.log(`📋 원두 헤더:`, headers);
  
  const beans = dataRows.map((row: any[], index: number) => {
    // id(0) 또는 name(1)이 있는 행만 처리
    if (!row[0] && !row[1]) {
      console.log(`⚠️ 원두 ${index + 1}번째 행에 ID나 이름이 없어 건너뜁니다.`);
      return null;
    }
    
    const bean = {
      name: row[1] || row[0] || `원두 ${index + 1}`, // name이 우선, 없으면 id 사용
      description: row[2] || '구글 시트에서 가져온 원두입니다.',
      notes: row[3] ? row[3].split(',').map((note: string) => note.trim()) : ['향미 노트'],
      origin: row[4] || '미상',
      imageUrl: row[5] || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
    };
    
    console.log(`✅ 원두 파싱 완료: ${bean.name}`);
    return bean;
  }).filter((bean): bean is Bean => bean !== null);
  
  console.log(`🫘 총 ${beans.length}개 원두 파싱 완료`);
  return beans;
}

// 상세 단계 데이터 파싱
function parseDetailedStepsData(rows: any[][]): { [recipeId: string]: BrewingStep[] } {
  console.log(`📖 상세 단계 데이터 파싱 시작... (${rows.length}개 행)`);
  
  if (rows.length < 2) {
    console.log('⚠️ 상세 단계 데이터가 충분하지 않습니다.');
    return {};
  }
  
  const [headers, ...dataRows] = rows;
  console.log(`📋 상세 단계 헤더:`, headers);
  
  const stepsData: { [recipeId: string]: BrewingStep[] } = {};
  
  dataRows.forEach((row: any[], index: number) => {
    const recipeId = row[1]; // recipe_name은 두 번째 컬럼 (index 1)
    if (!recipeId) {
      console.log(`⚠️ 상세 단계 ${index + 1}번째 행에 레시피 이름이 없어 건너뜁니다.`);
      return;
    }
    
    if (!stepsData[recipeId]) {
      stepsData[recipeId] = [];
      console.log(`📖 레시피 ${recipeId}의 상세 단계 생성`);
    }
    
    stepsData[recipeId].push({
      title: row[2] || '', // title은 세 번째 컬럼
      timeAndAmount: row[3] || '', // timeAndAmount는 네 번째 컬럼
      description: row[4] || '' // description은 다섯 번째 컬럼
    });
  });
  
  const recipeCount = Object.keys(stepsData).length;
  const totalSteps = Object.values(stepsData).reduce((sum, steps) => sum + steps.length, 0);
  console.log(`📖 총 ${recipeCount}개 레시피, ${totalSteps}개 상세 단계 파싱 완료`);
  
  return stepsData;
}

// 레시피 데이터 파싱
function parseRecipesData(rows: any[][], beansData: Bean[], stepsData: { [recipeId: string]: BrewingStep[] }): Recipe[] {
  console.log(`☕ 레시피 데이터 파싱 시작... (${rows.length}개 행)`);
  
  if (rows.length < 2) {
    console.log('⚠️ 레시피 데이터가 충분하지 않습니다.');
    return [];
  }
  
  const [headers, ...dataRows] = rows;
  console.log(`📋 레시피 헤더:`, headers);
  
  const recipes = dataRows.map((row: any[], index: number) => {
    // 레시피 이름이 있는 행만 처리
    if (!row[0] && !row[1]) {
      console.log(`⚠️ 레시피 ${index + 1}번째 행에 ID나 이름이 없어 건너뜁니다.`);
      return null;
    }
    
    const recipe: Recipe = {
      id: row[0] || `recipe-${index + 1}`,
      name: row[1] || `레시피 ${index + 1}`,
      description: row[2] || '구글 시트에서 가져온 레시피입니다.',
      method: row[3] || '푸어오버',
      dripper: row[4] || 'V60',
      temperature: (row[5] as '따뜻' | '아이스') || '따뜻',
      difficulty: (row[6] as '초급' | '중급' | '고급') || '초급',
      type: (row[7] as 'preset' | 'custom') || 'preset',
      brewingParams: {
        beanAmount: row[8] || '20g',
        grindSize: row[9] || '중간',
        waterTemperature: row[10] || '93°C',
        waterAmount: row[11] || '300ml',
        brewTime: row[12] || '3분'
      },
      recommendedBeans: [],
      steps: row[13] ? row[13].split('|').map((step: string) => step.trim()) : ['물을 붓고 추출합니다.'],
      imageUrl: row[14] || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      detailedSteps: stepsData[row[1]] || undefined // 레시피 이름으로 매핑
    };

    console.log(`✅ 레시피 파싱 완료: ${recipe.name} (${recipe.type})`);

    // 타겟 원두 설정 (커스텀 레시피용)
    if (recipe.type === 'custom' && row[15]) {
      const targetBean = beansData.find(bean => bean.name === row[15]);
      if (targetBean) {
        recipe.targetBean = targetBean;
        console.log(`🫘 타겟 원두 설정: ${targetBean.name}`);
      }
    }

    // 추천 원두 설정 (프리셋 레시피용)
    if (recipe.type === 'preset' && row[16]) {
      const recommendedBeanNames = row[16].split(',').map((name: string) => name.trim());
      recipe.recommendedBeans = beansData.filter(bean => 
        recommendedBeanNames.includes(bean.name)
      );
      console.log(`🫘 추천 원두 ${recipe.recommendedBeans.length}개 설정`);
    }

    // 맛 프로필 설정 (커스텀 레시피용)
    if (recipe.type === 'custom' && (row[17] || row[18] || row[19] || row[20])) {
      recipe.tasteProfile = {
        acidity: parseInt(row[17]) || 3,
        body: parseInt(row[18]) || 3,
        sweetness: parseInt(row[19]) || 3,
        bitterness: parseInt(row[20]) || 3
      };
      console.log(`👅 맛 프로필 설정 완료`);
    }

    // 메모 설정 (커스텀 레시피용)
    if (recipe.type === 'custom' && row[21]) {
      recipe.memo = row[21];
      console.log(`📝 메모 설정 완료`);
    }

    return recipe;
  }).filter((recipe): recipe is Recipe => recipe !== null);
  
  const presetCount = recipes.filter(r => r.type === 'preset').length;
  const customCount = recipes.filter(r => r.type === 'custom').length;
  console.log(`☕ 총 ${recipes.length}개 레시피 파싱 완료 (프리셋: ${presetCount}개, 커스텀: ${customCount}개)`);
  
  return recipes;
}

// 메인 함수들
export async function fetchBeansFromSheets(): Promise<Bean[]> {
  console.log('🚀 구글 시트에서 원두 데이터 가져오기 시작');
  try {
    const rows = await getSheetData(config.beansSheetName);
    const beans = parseBeansData(rows);
    console.log('🎉 원두 데이터 가져오기 성공');
    return beans;
  } catch (error) {
    console.error('💥 원두 데이터 가져오기 실패:', error);
    throw error;
  }
}

export async function fetchRecipesFromSheets(): Promise<Recipe[]> {
  console.log('🚀 구글 시트에서 레시피 데이터 가져오기 시작');
  try {
    // 1. 상세 단계 데이터 가져오기
    let stepsData: { [recipeId: string]: BrewingStep[] } = {};
    try {
      const stepsRows = await getSheetData(config.detailedStepsSheetName);
      stepsData = parseDetailedStepsData(stepsRows);
    } catch (error) {
      console.warn('⚠️ 상세 단계 데이터 가져오기 실패 (선택사항):', error);
    }

    // 2. 원두 데이터 가져오기
    let beansData: Bean[] = [];
    try {
      beansData = await fetchBeansFromSheets();
    } catch (error) {
      console.warn('⚠️ 원두 데이터 가져오기 실패 (선택사항):', error);
    }

    // 3. 레시피 데이터 가져오기
    const recipesRows = await getSheetData(config.recipesSheetName);
    const recipes = parseRecipesData(recipesRows, beansData, stepsData);
    
    console.log('🎉 레시피 데이터 가져오기 성공');
    return recipes;
  } catch (error) {
    console.error('💥 레시피 데이터 가져오기 실패:', error);
    throw error;
  }
}

// 캐시 없이 직접 데이터 가져오기
export async function getCachedRecipes(): Promise<Recipe[]> {
  console.log('🔄 레시피 데이터 가져오기 (캐시 없음)...');
  return await fetchRecipesFromSheets();
}

export async function getCachedBeans(): Promise<Bean[]> {
  console.log('🔄 원두 데이터 가져오기 (캐시 없음)...');
  return await fetchBeansFromSheets();
} 