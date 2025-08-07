'use client';

import { useBeans, useCustomRecipesByBean } from '../../hooks/useData';
import { Bean } from '../../types/recipe';
import Section from './ui/Section';

interface BeansGridProps {
  onBeanSelect: (beanName: string) => void;
}

export default function BeansGrid({ onBeanSelect }: BeansGridProps) {
  const { beans, loading: beansLoading, error: beansError } = useBeans();

  if (beansLoading) {
    return (
      <Section title="원두별 레시피">
        <div className="text-center py-8">
          <div className="text-gray-500">원두 정보를 불러오는 중...</div>
        </div>
      </Section>
    );
  }

  if (beansError) {
    return (
      <Section title="원두별 레시피">
        <div className="text-center py-8">
          <div className="text-red-500">원두 정보를 불러오는데 실패했습니다.</div>
          <div className="text-sm text-gray-500 mt-2">{beansError}</div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="원두별 레시피">
      <div className="grid grid-cols-2 gap-4">
        {beans.map((bean: Bean) => {
          return <BeanGridItem key={bean.name} bean={bean} onBeanSelect={onBeanSelect} />;
        })}
      </div>
    </Section>
  );
}

interface BeanGridItemProps {
  bean: Bean;
  onBeanSelect: (beanName: string) => void;
}

function BeanGridItem({ bean, onBeanSelect }: BeanGridItemProps) {
  const { recipes: customRecipes } = useCustomRecipesByBean(bean.name);
  const customRecipeCount = customRecipes.length;

  return (
    <div 
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
}