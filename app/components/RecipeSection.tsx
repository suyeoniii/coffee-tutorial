'use client';

import { useState } from 'react';
import { usePresetRecipes } from '../../hooks/useData';
import { Recipe } from '../../types/recipe';
import RecipeDetail from './RecipeDetail';
import UnifiedRecipeCard from './ui/UnifiedRecipeCard';
import Section from './ui/Section';

export default function RecipeSection() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { recipes: presetRecipes, loading, error } = usePresetRecipes();

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

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
            onClick={setSelectedRecipe}
            variant="default"
          />
        ))}
      </div>
    </Section>
  );
}