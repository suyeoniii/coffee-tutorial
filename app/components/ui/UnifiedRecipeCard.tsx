import { Recipe } from '../../../types/recipe';
import StarRating from '../StarRating';
import TemperatureBadge from './TemperatureBadge';
import BrewingParams from './BrewingParams';

interface UnifiedRecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  variant?: 'default' | 'compact';
}

export default function UnifiedRecipeCard({ recipe, onClick, variant = 'default' }: UnifiedRecipeCardProps) {
  const isCustom = recipe.type === 'custom';
  
  if (variant === 'compact' || isCustom) {
    return (
      <div 
        onClick={() => onClick(recipe)}
        className="border p-4 rounded cursor-pointer hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-medium">{recipe.name}</h4>
          <TemperatureBadge temperature={recipe.temperature} />
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
        
        {recipe.tasteProfile && (
          <div className="mb-3 space-y-1">
            <StarRating rating={recipe.tasteProfile.acidity} label="산미" />
            <StarRating rating={recipe.tasteProfile.body} label="바디" />
            <StarRating rating={recipe.tasteProfile.sweetness} label="단맛" />
            <StarRating rating={recipe.tasteProfile.bitterness} label="쓴맛" />
          </div>
        )}
        
        {recipe.memo && (
          <div className="bg-yellow-50 p-2 rounded mb-3">
            <p className="text-xs text-gray-700">
              <span className="font-medium">메모: </span>
              {recipe.memo}
            </p>
          </div>
        )}
        
        <BrewingParams 
          brewingParams={recipe.brewingParams} 
          dripper={recipe.dripper}
          layout="compact"
        />
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(recipe)}
      className="border p-4 rounded cursor-pointer hover:bg-gray-50"
    >
      <div className="flex gap-4">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-lg">{recipe.name}</h3>
            <TemperatureBadge temperature={recipe.temperature} />
          </div>
          <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
          
          <BrewingParams 
            brewingParams={recipe.brewingParams}
            layout="full"
          />
          
          {recipe.recommendedBeans && recipe.recommendedBeans.length > 0 && (
            <div className="mt-3 text-xs text-gray-500">
              <span className="font-medium">추천 원두:</span>
              <div className="mt-1 space-y-1">
                {recipe.recommendedBeans.map((bean, index) => (
                  <div key={index} className="text-xs">
                    <span className="font-medium">{bean.name}</span> ({bean.origin}) - {bean.notes.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 