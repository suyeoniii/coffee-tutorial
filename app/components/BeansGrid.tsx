'use client';

import { beans, getCustomRecipesByBean } from '../../data/recipes';

interface BeansGridProps {
  onBeanSelect: (beanName: string) => void;
}

export default function BeansGrid({ onBeanSelect }: BeansGridProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">원두별 레시피</h2>
      <div className="grid grid-cols-2 gap-4">
        {beans.map((bean) => {
          const customRecipeCount = getCustomRecipesByBean(bean.name).length;
          
          return (
            <div 
              key={bean.name}
              onClick={() => onBeanSelect(bean.name)}
              className="border p-3 rounded cursor-pointer hover:bg-gray-50"
            >
              <img 
                src={bean.imageUrl} 
                alt={bean.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h3 className="font-medium text-sm">{bean.name}</h3>
              <p className="text-xs text-gray-500 mb-1">{bean.origin}</p>
              <p className="text-xs text-gray-600">
                {customRecipeCount}개 레시피
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}