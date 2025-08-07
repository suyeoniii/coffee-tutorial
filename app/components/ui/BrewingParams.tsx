import { Recipe } from '../../../types/recipe';

interface BrewingParamsProps {
  brewingParams: Recipe['brewingParams'];
  dripper?: string;
  layout?: 'compact' | 'full';
}

export default function BrewingParams({ brewingParams, dripper, layout = 'full' }: BrewingParamsProps) {
  const params = [
    { label: '원두', value: brewingParams.beanAmount },
    { label: '분쇄', value: brewingParams.grindSize },
    { label: '물온도', value: brewingParams.waterTemperature },
    { label: '물양', value: brewingParams.waterAmount },
    { label: '시간', value: brewingParams.brewTime }
  ];

  if (dripper) {
    params.push({ label: '드리퍼', value: dripper });
  }

  if (layout === 'compact') {
    return (
      <div className="text-xs text-gray-500">
        <div className="flex gap-4 flex-wrap">
          {params.slice(0, 3).map((param, index) => (
            <span key={index}>
              <span className="font-medium">{param.label}:</span> {param.value}
            </span>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap mt-1">
          {params.slice(3).map((param, index) => (
            <span key={index}>
              <span className="font-medium">{param.label}:</span> {param.value}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-xs text-gray-500 space-y-2">
      <div className="flex gap-4 flex-wrap">
        {params.map((param, index) => (
          <span key={index}>
            <span className="font-medium">{param.label}:</span> {param.value}
          </span>
        ))}
      </div>
    </div>
  );
} 