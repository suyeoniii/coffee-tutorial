export interface Bean {
  name: string;
  description: string;
  notes: string[];
  origin: string;
  imageUrl: string;
}

export interface TasteProfile {
  acidity: number; // 1-5
  body: number; // 1-5
  sweetness: number; // 1-5
  bitterness: number; // 1-5
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  method: string;
  dripper: string;
  temperature: '따뜻' | '아이스';
  difficulty: '초급' | '중급' | '고급';
  type: 'preset' | 'custom'; // 프리셋 vs 원두별 커스텀
  brewingParams: {
    beanAmount: string;
    grindSize: string;
    waterTemperature: string;
    waterAmount: string;
    brewTime: string;
  };
  recommendedBeans: Bean[]; // preset용
  targetBean?: Bean; // custom용 - 특정 원두 타겟
  tasteProfile?: TasteProfile; // custom용 - 맛 프로필
  memo?: string; // custom용 - 개인 메모
  steps: string[];
  imageUrl: string;
}