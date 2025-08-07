import { useState, useEffect } from 'react';
import { Recipe, Bean } from '../types/recipe';

// 클라이언트 사이드에서 API를 통해 데이터를 가져오는 훅
export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}

export function useBeans() {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBeans() {
      try {
        setLoading(true);
        const response = await fetch('/api/beans');
        if (!response.ok) {
          throw new Error('Failed to fetch beans');
        }
        const data = await response.json();
        setBeans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchBeans();
  }, []);

  return { beans, loading, error };
}

// 필터링된 데이터를 위한 훅들
export function usePresetRecipes() {
  const { recipes, loading, error } = useRecipes();
  const presetRecipes = recipes.filter(recipe => recipe.type === 'preset');
  return { recipes: presetRecipes, loading, error };
}

export function useCustomRecipes() {
  const { recipes, loading, error } = useRecipes();
  const customRecipes = recipes.filter(recipe => recipe.type === 'custom');
  return { recipes: customRecipes, loading, error };
}

export function useCustomRecipesByBean(beanName: string) {
  const { recipes, loading, error } = useCustomRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.targetBean?.name === beanName);
  return { recipes: filteredRecipes, loading, error };
} 