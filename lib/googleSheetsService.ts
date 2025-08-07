import { google } from 'googleapis';
import { Recipe, Bean, BrewingStep } from '../types/recipe';

// 구글 시트 API 설정
const sheets = google.sheets('v4');

interface GoogleSheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  recipesSheetName: string;
  beansSheetName: string;
  detailedStepsSheetName: string;
}

// 환경변수에서 설정 읽기
const config: GoogleSheetsConfig = {
  apiKey: process.env.GOOGLE_SHEETS_API_KEY || '',
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '',
  recipesSheetName: process.env.RECIPES_SHEET_NAME || 'Recipes',
  beansSheetName: process.env.BEANS_SHEET_NAME || 'Beans',
  detailedStepsSheetName: process.env.DETAILED_STEPS_SHEET_NAME || 'DetailedSteps'
};

// 구글 시트에서 데이터 가져오기
async function getSheetData(sheetName: string, range?: string): Promise<any[][]> {
  try {
    const fullRange = range ? `${sheetName}!${range}` : `${sheetName}!A:Z`;
    
    const response = await sheets.spreadsheets.values.get({
      auth: config.apiKey,
      spreadsheetId: config.spreadsheetId,
      range: fullRange,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`Error fetching data from sheet ${sheetName}:`, error);
    throw error;
  }
}

// 원두 데이터 파싱
function parseBeansData(rows: any[][]): Bean[] {
  if (rows.length < 2) return [];
  
  const [headers, ...dataRows] = rows;
  
  return dataRows.map((row: any[]) => ({
    name: row[0] || '',
    description: row[1] || '',
    notes: row[2] ? row[2].split(',').map((note: string) => note.trim()) : [],
    origin: row[3] || '',
    imageUrl: row[4] || ''
  }));
}

// 상세 단계 데이터 파싱
function parseDetailedStepsData(rows: any[][]): { [recipeId: string]: BrewingStep[] } {
  if (rows.length < 2) return {};
  
  const [headers, ...dataRows] = rows;
  const stepsData: { [recipeId: string]: BrewingStep[] } = {};
  
  dataRows.forEach((row: any[]) => {
    const recipeId = row[0];
    if (!recipeId) return;
    
    if (!stepsData[recipeId]) {
      stepsData[recipeId] = [];
    }
    
    stepsData[recipeId].push({
      title: row[1] || '',
      timeAndAmount: row[2] || '',
      description: row[3] || ''
    });
  });
  
  return stepsData;
}

// 레시피 데이터 파싱
function parseRecipesData(rows: any[][], beansData: Bean[], stepsData: { [recipeId: string]: BrewingStep[] }): Recipe[] {
  if (rows.length < 2) return [];
  
  const [headers, ...dataRows] = rows;
  
  return dataRows.map((row: any[], index: number) => {
    // 레시피 이름이 있는 행만 처리
    if (!row[0] && !row[1]) return null;
    
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
      detailedSteps: stepsData[row[0]] || undefined
    };

    // 타겟 원두 설정 (커스텀 레시피용)
    if (recipe.type === 'custom' && row[15]) {
      const targetBean = beansData.find(bean => bean.name === row[15]);
      if (targetBean) {
        recipe.targetBean = targetBean;
      }
    }

    // 추천 원두 설정 (프리셋 레시피용)
    if (recipe.type === 'preset' && row[16]) {
      const recommendedBeanNames = row[16].split(',').map((name: string) => name.trim());
      recipe.recommendedBeans = beansData.filter(bean => 
        recommendedBeanNames.includes(bean.name)
      );
    }

    // 맛 프로필 설정 (커스텀 레시피용)
    if (recipe.type === 'custom' && (row[17] || row[18] || row[19] || row[20])) {
      recipe.tasteProfile = {
        acidity: parseInt(row[17]) || 3,
        body: parseInt(row[18]) || 3,
        sweetness: parseInt(row[19]) || 3,
        bitterness: parseInt(row[20]) || 3
      };
    }

    // 메모 설정 (커스텀 레시피용)
    if (recipe.type === 'custom' && row[21]) {
      recipe.memo = row[21];
    }

    return recipe;
  }).filter((recipe): recipe is Recipe => recipe !== null);
}

// 메인 함수들
export async function fetchBeansFromSheets(): Promise<Bean[]> {
  try {
    const rows = await getSheetData(config.beansSheetName);
    return parseBeansData(rows);
  } catch (error) {
    console.error('Error fetching beans data:', error);
    return [];
  }
}

export async function fetchRecipesFromSheets(): Promise<Recipe[]> {
  try {
    // 원두 데이터 먼저 가져오기
    const beansData = await fetchBeansFromSheets();
    
    // 상세 단계 데이터 가져오기
    const stepsRows = await getSheetData(config.detailedStepsSheetName);
    const stepsData = parseDetailedStepsData(stepsRows);
    
    // 레시피 데이터 가져오기
    const recipeRows = await getSheetData(config.recipesSheetName);
    const recipes = parseRecipesData(recipeRows, beansData, stepsData);
    
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes data:', error);
    return [];
  }
}

// 캐싱을 위한 함수들
let recipesCache: Recipe[] | null = null;
let beansCache: Bean[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export async function getCachedRecipes(): Promise<Recipe[]> {
  const now = Date.now();
  
  if (!recipesCache || now - lastFetchTime > CACHE_DURATION) {
    recipesCache = await fetchRecipesFromSheets();
    lastFetchTime = now;
  }
  
  return recipesCache;
}

export async function getCachedBeans(): Promise<Bean[]> {
  const now = Date.now();
  
  if (!beansCache || now - lastFetchTime > CACHE_DURATION) {
    beansCache = await fetchBeansFromSheets();
    lastFetchTime = now;
  }
  
  return beansCache;
} 