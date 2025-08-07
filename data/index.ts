import { Recipe, Bean } from '../types/recipe';

// 로컬 데이터 (fallback)
import { 
  recipes as localRecipes, 
  beans as localBeans, 
  getCustomRecipesByBean as localGetCustomRecipesByBean 
} from './recipes';

// 구글 시트 서비스 (서버 사이드만)
let googleSheetsService: any = null;
if (typeof window === 'undefined') {
  googleSheetsService = require('../lib/googleSheetsService');
}

// 환경 설정 확인
function hasGoogleSheetsConfig(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_EMAIL && 
    process.env.GOOGLE_PRIVATE_KEY && 
    process.env.GOOGLE_SHEET_ID
  );
}

// 메인 데이터 가져오기 함수들
export async function getRecipes(): Promise<Recipe[]> {
  if (hasGoogleSheetsConfig() && googleSheetsService) {
    try {
      const recipes = await googleSheetsService.getCachedRecipes();
      console.log(`✅ 구글 시트: ${recipes.length}개 레시피`);
      return recipes;
    } catch (error) {
      console.error('❌ 구글 시트 실패, 로컬 데이터 사용:', error);
      return localRecipes;
    }
  }
  
  console.log('📁 로컬 데이터 사용');
  return localRecipes;
}

export async function getBeans(): Promise<Bean[]> {
  if (hasGoogleSheetsConfig() && googleSheetsService) {
    try {
      const beans = await googleSheetsService.getCachedBeans();
      console.log(`✅ 구글 시트: ${beans.length}개 원두`);
      return beans;
    } catch (error) {
      console.error('❌ 구글 시트 실패, 로컬 데이터 사용:', error);
      return localBeans;
    }
  }
  
  console.log('📁 로컬 데이터 사용');
  return localBeans;
}

// 필터링된 데이터 함수들
export async function getPresetRecipes(): Promise<Recipe[]> {
  const recipes = await getRecipes();
  return recipes.filter(recipe => recipe.type === 'preset');
}

export async function getCustomRecipes(): Promise<Recipe[]> {
  const recipes = await getRecipes();
  return recipes.filter(recipe => recipe.type === 'custom');
}

export async function getCustomRecipesByBean(beanName: string): Promise<Recipe[]> {
  const customRecipes = await getCustomRecipes();
  return customRecipes.filter(recipe => recipe.targetBean?.name === beanName);
}

// 동기 버전 (기존 호환성용)
export const recipes = localRecipes;
export const beans = localBeans;
export const presetRecipes = localRecipes.filter(recipe => recipe.type === 'preset');
export const customRecipes = localRecipes.filter(recipe => recipe.type === 'custom');
export { getCustomRecipesByBean as localGetCustomRecipesByBean } from './recipes'; 