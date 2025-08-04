import { recipes } from '../../data/recipes';

export default function RecipeSection() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">커피 레시피</h2>
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded">
            <div className="flex gap-4">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-lg">{recipe.name}</h3>
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
                
                <div className="text-xs text-gray-500 space-y-2">
                  <div className="flex gap-4 flex-wrap">
                    <span><span className="font-medium">원두:</span> {recipe.brewingParams.beanAmount}</span>
                    <span><span className="font-medium">분쇄:</span> {recipe.brewingParams.grindSize}</span>
                    <span><span className="font-medium">물온도:</span> {recipe.brewingParams.waterTemperature}</span>
                    <span><span className="font-medium">물양:</span> {recipe.brewingParams.waterAmount}</span>
                    <span><span className="font-medium">시간:</span> {recipe.brewingParams.brewTime}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium">추천 원두:</span>
                    <div className="mt-1 space-y-1">
                      {recipe.recommendedBeans.map((bean, index) => (
                        <div key={index} className="text-xs">
                          <span className="font-medium">{bean.name}</span> ({bean.origin}) - {bean.notes.join(', ')}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}