'use client';

import { Recipe } from '../../types/recipe';
import StarRating from './StarRating';
import BackButton from './BackButton';
import TemperatureBadge from './ui/TemperatureBadge';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export default function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  const brewingSteps = [
    {
      title: '기본 정보',
      items: [
        `원두: ${recipe.brewingParams.beanAmount}`,
        `분쇄도: ${recipe.brewingParams.grindSize}`,
        `물 온도: ${recipe.brewingParams.waterTemperature}`,
        `총 물양: ${recipe.brewingParams.waterAmount}`,
        `목표 시간: ${recipe.brewingParams.brewTime}`
      ]
    }
  ];

  // steps를 섹션별로 분리 - 린싱 관련 단계 제거
  const filteredSteps = recipe.steps.filter(step => 
    !step.includes('린싱') && !step.includes('예열')
  );
  
  const additionalSteps = filteredSteps.map((step, index) => ({
    title: index === 0 ? '블루밍' : index === 1 ? '1차 추출' : index === 2 ? '2차 추출' : index === 3 ? '3차 추출' : '마무리',
    items: [step]
  }));

  const allSteps = [...brewingSteps, ...additionalSteps];

  return (
    <div>
      <BackButton onClick={onBack} label="레시피 목록으로 돌아가기" />
        
        {/* 상단 레시피 정보 */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl font-bold">{recipe.name}</h1>
                <TemperatureBadge temperature={recipe.temperature} />
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
              
              <div className="text-xs text-gray-500">
                <div className="flex gap-4 flex-wrap">
                  <span><span className="font-medium">방법:</span> {recipe.method}</span>
                  <span><span className="font-medium">드리퍼:</span> {recipe.dripper}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 맛 프로필 (커스텀 레시피인 경우) */}
          {recipe.tasteProfile && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">예상 맛 프로필</h3>
              <div className="grid grid-cols-2 gap-2">
                <StarRating rating={recipe.tasteProfile.acidity} label="산미" />
                <StarRating rating={recipe.tasteProfile.body} label="바디" />
                <StarRating rating={recipe.tasteProfile.sweetness} label="단맛" />
                <StarRating rating={recipe.tasteProfile.bitterness} label="쓴맛" />
              </div>
            </div>
          )}

          {/* 메모 (커스텀 레시피인 경우) */}
          {recipe.memo && (
            <div className="mt-4 pt-4 border-t">
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">💡 메모: </span>
                  {recipe.memo}
                </p>
              </div>
            </div>
          )}

          {/* 추천 원두 (프리셋 레시피인 경우) */}
          {recipe.recommendedBeans && recipe.recommendedBeans.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">추천 원두</h3>
              <div className="space-y-2">
                {recipe.recommendedBeans.map((bean, index) => (
                  <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                    <span className="font-medium">{bean.name}</span> ({bean.origin}) - {bean.notes.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      {/* 단계별 가이드 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">브루잉 가이드</h2>
        <div className="space-y-4">
          {allSteps.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg p-4">
              <h3 className="font-medium text-md mb-3 flex items-center">
                <span className="bg-gray-800 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center mr-2">
                  {sectionIndex + 1}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-700 flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}