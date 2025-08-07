'use client';

import { useState } from 'react';
import { useBeans, useCustomRecipesByBean } from '../../hooks/useData';
import { Recipe } from '../../types/recipe';
import RecipeDetail from './RecipeDetail';
import UnifiedRecipeCard from './ui/UnifiedRecipeCard';
import BackButton from './BackButton';

interface BeanDetailProps {
  beanName: string;
  onBack: () => void;
}

export default function BeanDetail({ beanName, onBack }: BeanDetailProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { beans, loading: beansLoading, error: beansError } = useBeans();
  const { recipes: customRecipes, loading: recipesLoading, error: recipesError } = useCustomRecipesByBean(beanName);
  
  const bean = beans.find(b => b.name === beanName);

  if (beansLoading || recipesLoading) {
    return (
      <div>
        <BackButton onClick={onBack} label="원두 목록으로 돌아가기" />
        <div className="text-center py-8">
          <div className="text-gray-500">정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (beansError || recipesError) {
    return (
      <div>
        <BackButton onClick={onBack} label="원두 목록으로 돌아가기" />
        <div className="text-center py-8">
          <div className="text-red-500">정보를 불러오는데 실패했습니다.</div>
          <div className="text-sm text-gray-500 mt-2">{beansError || recipesError}</div>
        </div>
      </div>
    );
  }

  if (!bean) {
    return (
      <div>
        <BackButton onClick={onBack} label="원두 목록으로 돌아가기" />
        <div className="text-center py-8">
          <div className="text-red-500">원두를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <div>
      <BackButton onClick={onBack} label="원두 목록으로 돌아가기" />
        
        <div className="flex gap-4 mb-4">
          <img 
            src={bean.imageUrl} 
            alt={bean.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{bean.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{bean.origin}</p>
            <p className="text-xs text-gray-500">{bean.description}</p>
            <div className="mt-2">
              <span className="text-xs font-medium">향미 노트: </span>
              <span className="text-xs text-gray-600">{bean.notes.join(', ')}</span>
            </div>
          </div>
        </div>

      <div>
        <h3 className="text-md font-semibold mb-3">커스텀 레시피 ({customRecipes.length}개)</h3>
        <div className="space-y-4">
          {customRecipes.map((recipe) => (
            <UnifiedRecipeCard 
              key={recipe.id}
              recipe={recipe}
              onClick={setSelectedRecipe}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </div>
  );
}