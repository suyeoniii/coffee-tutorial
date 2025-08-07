'use client';

import { useRouter } from 'next/navigation';
import { usePresetRecipes } from '../../hooks/useData';
import { Recipe } from '../../types/recipe';
import UnifiedRecipeCard from './ui/UnifiedRecipeCard';
import Section from './ui/Section';

export default function RecipeSection() {
  const router = useRouter();
  const { recipes: presetRecipes, loading, error } = usePresetRecipes();

  const handleRecipeClick = (recipe: Recipe) => {
    router.push(`/recipes/${recipe.id}`);
  };

  if (loading) {
    return (
      <Section title="커피 레시피">
        <div className="text-center py-8">
          <div className="text-gray-500">레시피를 불러오는 중...</div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section title="커피 레시피">
        <div className="text-center py-8">
          <div className="text-red-500">레시피를 불러오는데 실패했습니다.</div>
          <div className="text-sm text-gray-500 mt-2">{error}</div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="커피 레시피">
      <div className="space-y-6">
        {presetRecipes.map((recipe) => (
          <UnifiedRecipeCard 
            key={recipe.id}
            recipe={recipe}
            onClick={handleRecipeClick}
            variant="default"
          />
        ))}
      </div>
    </Section>
  );
}