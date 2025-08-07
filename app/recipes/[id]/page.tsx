'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecipes } from '../../../hooks/useData';
import { Recipe } from '../../../types/recipe';
import RecipeDetail from '../../components/RecipeDetail';
import BackButton from '../../components/BackButton';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { recipes, loading, error } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  
  const recipeId = params.id as string;

  useEffect(() => {
    if (recipes.length > 0 && recipeId) {
      const foundRecipe = recipes.find(r => r.id === recipeId);
      setRecipe(foundRecipe || null);
    }
  }, [recipes, recipeId]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center py-8">
          <div className="text-gray-500">레시피를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <BackButton onClick={handleBack} label="뒤로 가기" />
        <div className="text-center py-8">
          <div className="text-red-500">레시피를 불러오는데 실패했습니다.</div>
          <div className="text-sm text-gray-500 mt-2">{error}</div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <BackButton onClick={handleBack} label="뒤로 가기" />
        <div className="text-center py-8">
          <div className="text-red-500">레시피를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <RecipeDetail recipe={recipe} onBack={handleBack} />
    </div>
  );
} 