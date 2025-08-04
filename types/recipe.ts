export interface Bean {
  name: string;
  description: string;
  notes: string[];
  origin: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  method: string;
  dripper: string;
  temperature: '따뜻' | '아이스';
  difficulty: '초급' | '중급' | '고급';
  brewingParams: {
    beanAmount: string;
    grindSize: string;
    waterTemperature: string;
    waterAmount: string;
    brewTime: string;
  };
  recommendedBeans: Bean[];
  steps: string[];
  imageUrl: string;
}