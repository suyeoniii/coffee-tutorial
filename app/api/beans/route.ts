import { NextResponse } from 'next/server';
import { getBeans } from '../../../data/index';

export async function GET() {
  try {
    const beans = await getBeans();
    return NextResponse.json(beans);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch beans', details: message },
      { status: 500 }
    );
  }
} 