import { Recipe, Bean } from '../types/recipe';

// 구글 시트 강제 사용 (환경 변수가 있으면 무조건 사용)
const hasGoogleSheetsConfig = () => {
  return !!(
    process.env.GOOGLE_CLIENT_EMAIL && 
    process.env.GOOGLE_PRIVATE_KEY && 
    process.env.GOOGLE_SHEET_ID
  );
};

// 로컬 데이터 (fallback)
import { recipes as localRecipes, beans as localBeans, getCustomRecipesByBean as localGetCustomRecipesByBean } from './recipes';

// 구글 시트 데이터 (클라이언트 사이드에서는 사용 불가)
let googleSheetsService: any = null;
if (typeof window === 'undefined') {
  // 서버 사이드에서만 구글 시트 서비스 import
  googleSheetsService = require('../lib/googleSheetsService');
}

// 통합 데이터 가져오기 함수들
export async function getRecipes(): Promise<Recipe[]> {
  if (hasGoogleSheetsConfig() && googleSheetsService) {
    console.log('🔍 구글 시트에서 레시피 데이터를 가져옵니다...');
    try {
      const recipes = await googleSheetsService.getCachedRecipes();
      console.log(`✅ 구글 시트에서 ${recipes.length}개 레시피를 가져왔습니다.`);
      return recipes;
    } catch (error) {
      console.error('❌ 구글 시트에서 데이터 가져오기 실패, 로컬 데이터 사용:', error);
      return localRecipes;
    }
  }
  
  console.log('📁 로컬 레시피 데이터를 사용합니다.');
  return localRecipes;
}

export async function getBeans(): Promise<Bean[]> {
  if (hasGoogleSheetsConfig() && googleSheetsService) {
    console.log('🔍 구글 시트에서 원두 데이터를 가져옵니다...');
    try {
      const beans = await googleSheetsService.getCachedBeans();
      console.log(`✅ 구글 시트에서 ${beans.length}개 원두를 가져왔습니다.`);
      return beans;
    } catch (error) {
      console.error('❌ 구글 시트에서 원두 데이터 가져오기 실패, 로컬 데이터 사용:', error);
      return localBeans;
    }
  }
  
  console.log('📁 로컬 원두 데이터를 사용합니다.');
  return localBeans;
}

// 필터링 함수들
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

// 동기 버전 (기존 호환성을 위해)
export const recipes = localRecipes;
export const beans = localBeans;
export const presetRecipes = localRecipes.filter(recipe => recipe.type === 'preset');
export const customRecipes = localRecipes.filter(recipe => recipe.type === 'custom');
export { getCustomRecipesByBean as localGetCustomRecipesByBean } from './recipes'; 