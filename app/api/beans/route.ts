import { NextResponse } from 'next/server';
import { getBeans } from '../../../data';

export async function GET() {
  try {
    const beans = await getBeans();
    return NextResponse.json(beans);
  } catch (error) {
    console.error('Error fetching beans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beans' },
      { status: 500 }
    );
  }
} 