import { NextResponse } from 'next/server';
import { getBeans } from '../../../data/index';

export async function GET() {
  console.log('🔄 API /api/beans 호출됨');
  
  try {
    console.log('📞 getBeans() 함수 호출 시작...');
    const beans = await getBeans();
    console.log(`✅ API 응답 준비: ${beans.length}개 원두`);
    
    return NextResponse.json(beans);
  } catch (error) {
    console.error('❌ /api/beans 에러:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch beans', details: errorMessage },
      { status: 500 }
    );
  }
} 