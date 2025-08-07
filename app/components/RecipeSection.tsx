'use client';

import { useState } from 'react';
import { presetRecipes } from '../../data/recipes';
import { Recipe } from '../../types/recipe';
import RecipeDetail from './RecipeDetail';
import UnifiedRecipeCard from './ui/UnifiedRecipeCard';
import Section from './ui/Section';

export default function RecipeSection() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
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