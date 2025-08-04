'use client';

import { beans, getCustomRecipesByBean } from '../../data/recipes';
import StarRating from './StarRating';

interface BeanDetailProps {
  beanName: string;
  onBack: () => void;
}

export default function BeanDetail({ beanName, onBack }: BeanDetailProps) {
  const bean = beans.find(b => b.name === beanName);
  const customRecipes = getCustomRecipesByBean(beanName);

  if (!bean) {
    return <div>원두를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <button 
          onClick={onBack}
          className="text-sm text-gray-600 mb-2"
        >
          ← 원두 목록으로 돌아가기
        </button>
        
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
      </div>

      <div>
        <h3 className="text-md font-semibold mb-3">커스텀 레시피 ({customRecipes.length}개)</h3>
        <div className="space-y-4">
          {customRecipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{recipe.name}</h4>
                <span className={`px-2 py-1 rounded text-xs ${
                  recipe.difficulty === '초급' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === '중급' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  recipe.temperature === '따뜻' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {recipe.temperature}
                </span>
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
              
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex gap-4 flex-wrap">
                  <span><span className="font-medium">원두:</span> {recipe.brewingParams.beanAmount}</span>
                  <span><span className="font-medium">분쇄:</span> {recipe.brewingParams.grindSize}</span>
                  <span><span className="font-medium">물온도:</span> {recipe.brewingParams.waterTemperature}</span>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <span><span className="font-medium">물양:</span> {recipe.brewingParams.waterAmount}</span>
                  <span><span className="font-medium">시간:</span> {recipe.brewingParams.brewTime}</span>
                  <span><span className="font-medium">드리퍼:</span> {recipe.dripper}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}