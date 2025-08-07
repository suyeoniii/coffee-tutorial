import { NextResponse } from 'next/server';
import { getRecipes } from '../../../data/index';

export async function GET() {
  try {
    const recipes = await getRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch recipes', details: message },
      { status: 500 }
    );
  }
} 