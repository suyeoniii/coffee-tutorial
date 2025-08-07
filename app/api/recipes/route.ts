import { NextResponse } from 'next/server';
import { getRecipes } from '../../../data/index';

export async function GET() {
  console.log('🔄 API /api/recipes 호출됨');
  
  try {
    console.log('📞 getRecipes() 함수 호출 시작...');
    const recipes = await getRecipes();
    console.log(`✅ API 응답 준비: ${recipes.length}개 레시피`);
    
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('❌ /api/recipes 에러:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch recipes', details: errorMessage },
      { status: 500 }
    );
  }
} 