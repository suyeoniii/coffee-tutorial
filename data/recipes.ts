import { Recipe, Bean, BrewingStep } from '../types/recipe';

// 공통 원두 데이터
export const beans: Bean[] = [
  {
    name: '에티오피아 예가체프',
    description: '밝고 과일향이 풍부한 단일 원두',
    notes: ['레몬', '베리', '플로랄'],
    origin: '에티오피아',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
  },
  {
    name: '케냐 AA',
    description: '강렬한 산미와 와인같은 바디',
    notes: ['블랙커런트', '와인', '시트러스'],
    origin: '케냐',
    imageUrl: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400'
  },
  {
    name: '콜롬비아 수프리모',
    description: '균형잡힌 바디와 부드러운 산미',
    notes: ['카라멜', '초콜릿', '견과류'],
    origin: '콜롬비아',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
  },
  {
    name: '브라질 산토스',
    description: '부드럽고 달콤한 클래식 원두',
    notes: ['견과류', '카라멜', '바닐라'],
    origin: '브라질',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400'
  },
  {
    name: '과테말라 안티구아',
    description: '진한 바디와 스모키한 풍미',
    notes: ['다크초콜릿', '스파이스', '토바코'],
    origin: '과테말라',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'
  }
];

export const recipes: Recipe[] = [
  // 프리셋 레시피들
  {
    id: '1',
    name: 'V60 클래식 드립',
    description: '균형잡힌 맛을 위한 기본 V60 레시피',
    method: '푸어오버',
    dripper: 'V60',
    temperature: '따뜻',
    difficulty: '초급',
    type: 'preset',
    brewingParams: {
      beanAmount: '20g',
      grindSize: '중세',
      waterTemperature: '92-94°C',
      waterAmount: '320ml',
      brewTime: '2분 30초'
    },
    recommendedBeans: [beans[0], beans[1], beans[2]],
    steps: [
      '필터를 린싱하고 드리퍼를 예열합니다',
      '커피 20g을 중세로 분쇄하여 넣습니다',
      '40ml의 물로 30초간 블루밍합니다',
      '원을 그리며 천천히 물을 부어줍니다',
      '총 추출시간 2분 30초를 목표로 합니다'
    ],
    detailedSteps: [
      {
        title: '블루밍',
        timeAndAmount: '0분 00초 ~ 0분 30초, 40ml',
        description: '가루 전체가 젖도록 천천히 부어주세요.'
      },
      {
        title: '1차 추출',
        timeAndAmount: '0분 30초 ~ 1분 10초, 120ml까지 (총 160ml)',
        description: '중앙에서 바깥으로 나선형으로 부어주세요.'
      },
      {
        title: '2차 추출',
        timeAndAmount: '1분 10초 ~ 1분 50초, 240ml까지 (총 280ml)',
        description: '조금 더 빠른 속도로 부어주세요.'
      },
      {
        title: '3차 추출',
        timeAndAmount: '1분 50초 ~ 2분 30초, 320ml까지 (총 320ml)',
        description: '천천히 마무리해주세요.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
  },
  {
    id: '2',
    name: '칼리타 웨이브 드립',
    description: '안정적이고 부드러운 추출을 위한 칼리타 레시피',
    method: '푸어오버',
    dripper: '칼리타 웨이브',
    temperature: '따뜻',
    difficulty: '초급',
    type: 'preset',
    brewingParams: {
      beanAmount: '22g',
      grindSize: '중간',
      waterTemperature: '90-92°C',
      waterAmount: '350ml',
      brewTime: '3분'
    },
    recommendedBeans: [beans[2], beans[3]],
    steps: [
      '웨이브 필터를 사용하여 드리퍼를 준비합니다',
      '커피 22g을 중간 분쇄도로 갈아줍니다',
      '50ml로 45초간 블루밍합니다',
      '3번에 나누어 천천히 추출합니다',
      '전체 시간 3분을 맞춰줍니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
  },
  {
    id: '3',
    name: '체멕스 클린 컵',
    description: '깔끔하고 클리어한 맛을 위한 체멕스 레시피',
    method: '푸어오버',
    dripper: '체멕스',
    temperature: '따뜻',
    difficulty: '중급',
    type: 'preset',
    brewingParams: {
      beanAmount: '30g',
      grindSize: '중굵은',
      waterTemperature: '95°C',
      waterAmount: '500ml',
      brewTime: '4분'
    },
    recommendedBeans: [beans[4], beans[0]],
    steps: [
      '두꺼운 체멕스 필터를 사용합니다',
      '커피 30g을 중굵게 분쇄합니다',
      '60ml로 1분간 긴 블루밍을 합니다',
      '높은 위치에서 천천히 물을 부어줍니다',
      '총 4분의 추출시간을 맞춥니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'
  },
  {
    id: '4',
    name: '아이스 V60',
    description: '시원하고 상큼한 아이스 커피 레시피',
    method: '푸어오버',
    dripper: 'V60',
    temperature: '아이스',
    difficulty: '중급',
    type: 'preset',
    brewingParams: {
      beanAmount: '25g',
      grindSize: '중세',
      waterTemperature: '95°C',
      waterAmount: '250ml + 얼음 150g',
      brewTime: '2분'
    },
    recommendedBeans: [beans[1], beans[0]],
    steps: [
      '서버에 얼음 150g을 미리 넣어둡니다',
      '커피 25g을 중세로 분쇄합니다',
      '40ml로 30초 블루밍합니다',
      '짧은 시간에 집중적으로 추출합니다',
      '얼음과 함께 즉시 서빙합니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400'
  },
  {
    id: '5',
    name: '프렌치프레스 풀바디',
    description: '진하고 오일리한 바디감을 위한 침출식 레시피',
    method: '침출식',
    dripper: '프렌치프레스',
    temperature: '따뜻',
    difficulty: '초급',
    type: 'preset',
    brewingParams: {
      beanAmount: '30g',
      grindSize: '굵은',
      waterTemperature: '96°C',
      waterAmount: '500ml',
      brewTime: '4분'
    },
    recommendedBeans: [beans[3], beans[4]],
    steps: [
      '프렌치프레스를 뜨거운 물로 예열합니다',
      '커피 30g을 굵게 분쇄하여 넣습니다',
      '뜨거운 물을 한 번에 모두 부어줍니다',
      '4분간 우려낸 후 플런저를 천천히 내립니다',
      '바로 다른 용기로 옮겨 과추출을 방지합니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400'
  },

  // 원두별 커스텀 레시피들
  // 에티오피아 예가체프 커스텀 레시피들
  {
    id: 'custom-1',
    name: 'V60 밝은 산미 강조',
    description: '예가체프의 과일향과 산미를 극대화한 레시피',
    method: '푸어오버',
    dripper: 'V60',
    temperature: '따뜻',
    difficulty: '중급',
    type: 'custom',
    brewingParams: {
      beanAmount: '18g',
      grindSize: '중세',
      waterTemperature: '94°C',
      waterAmount: '300ml',
      brewTime: '2분 15초'
    },
    recommendedBeans: [],
    targetBean: beans[0],
    tasteProfile: {
      acidity: 5,
      body: 2,
      sweetness: 3,
      bitterness: 1
    },
    memo: '과일향을 극대화하고 싶을 때 추천. 높은 온도로 산미를 살렸음',
    steps: [
      '필터를 린싱하고 드리퍼를 예열합니다',
      '커피 18g을 중세로 분쇄합니다',
      '36ml로 30초간 블루밍합니다',
      '빠르게 원을 그리며 추출합니다',
      '2분 15초 안에 마무리합니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
  },
  {
    id: 'custom-2',
    name: '아이스 시트러스 부스트',
    description: '시원한 온도에서 레몬향을 강조한 아이스 레시피',
    method: '푸어오버',
    dripper: 'V60',
    temperature: '아이스',
    difficulty: '중급',
    type: 'custom',
    brewingParams: {
      beanAmount: '22g',
      grindSize: '중세',
      waterTemperature: '96°C',
      waterAmount: '220ml + 얼음 180g',
      brewTime: '1분 45초'
    },
    recommendedBeans: [],
    targetBean: beans[0],
    tasteProfile: {
      acidity: 5,
      body: 1,
      sweetness: 2,
      bitterness: 1
    },
    memo: '여름에 상큼하게 마시고 싶을 때. 레몬향이 살아있음',
    steps: [
      '서버에 얼음 180g을 넣어둡니다',
      '커피 22g을 중세로 분쇄합니다',
      '44ml로 짧게 블루밍합니다',
      '짧은 시간에 집중 추출합니다',
      '얼음과 함께 즉시 서빙합니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
  },

  // 케냐 AA 커스텀 레시피들
  {
    id: 'custom-3',
    name: 'V60 와인향 강조',
    description: '케냐 AA의 독특한 와인향을 부각시킨 레시피',
    method: '푸어오버',
    dripper: 'V60',
    temperature: '따뜻',
    difficulty: '고급',
    type: 'custom',
    brewingParams: {
      beanAmount: '21g',
      grindSize: '중세',
      waterTemperature: '92°C',
      waterAmount: '330ml',
      brewTime: '3분'
    },
    recommendedBeans: [],
    targetBean: beans[1],
    tasteProfile: {
      acidity: 4,
      body: 4,
      sweetness: 2,
      bitterness: 2
    },
    memo: '와인같은 복합미를 느끼고 싶을 때. 긴 추출로 바디감 증가',
    steps: [
      '필터를 린싱하고 충분히 예열합니다',
      '커피 21g을 중세로 분쇄합니다',
      '42ml로 45초간 긴 블루밍합니다',
      '천천히 원을 그리며 추출합니다',
      '총 3분의 추출시간을 맞춥니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400'
  },

  // 콜롬비아 수프리모 커스텀 레시피들
  {
    id: 'custom-4',
    name: '칼리타 균형잡힌 밸런스',
    description: '콜롬비아의 균형미를 극대화한 안정적인 레시피',
    method: '푸어오버',
    dripper: '칼리타 웨이브',
    temperature: '따뜻',
    difficulty: '초급',
    type: 'custom',
    brewingParams: {
      beanAmount: '23g',
      grindSize: '중간',
      waterTemperature: '91°C',
      waterAmount: '370ml',
      brewTime: '3분 30초'
    },
    recommendedBeans: [],
    targetBean: beans[2],
    tasteProfile: {
      acidity: 3,
      body: 4,
      sweetness: 4,
      bitterness: 2
    },
    memo: '처음 마셔보는 사람에게 추천하는 밸런스. 부드럽고 달콤함',
    steps: [
      '웨이브 필터로 드리퍼를 준비합니다',
      '커피 23g을 중간 분쇄합니다',
      '46ml로 45초간 블루밍합니다',
      '3번에 나누어 안정적으로 추출합니다',
      '총 3분 30초로 여유있게 추출합니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
  },

  // 브라질 산토스 커스텀 레시피들
  {
    id: 'custom-5',
    name: '프렌치프레스 달콤한 바디',
    description: '브라질 산토스의 달콤함과 바디감을 강조한 레시피',
    method: '침출식',
    dripper: '프렌치프레스',
    temperature: '따뜻',
    difficulty: '초급',
    type: 'custom',
    brewingParams: {
      beanAmount: '32g',
      grindSize: '굵은',
      waterTemperature: '94°C',
      waterAmount: '520ml',
      brewTime: '4분 30초'
    },
    recommendedBeans: [],
    targetBean: beans[3],
    tasteProfile: {
      acidity: 2,
      body: 5,
      sweetness: 5,
      bitterness: 2
    },
    memo: '달콤하고 부드러운 바디감을 원할 때. 오후 시간대 추천',
    steps: [
      '프렌치프레스를 충분히 예열합니다',
      '커피 32g을 굵게 분쇄합니다',
      '뜨거운 물을 모두 부어줍니다',
      '4분 30초간 충분히 우려냅니다',
      '플런저를 천천히 내리고 바로 따라냅니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400'
  }
];

// 프리셋 레시피만 필터링
export const presetRecipes = recipes.filter(recipe => recipe.type === 'preset');

// 커스텀 레시피만 필터링
export const customRecipes = recipes.filter(recipe => recipe.type === 'custom');

// 특정 원두의 커스텀 레시피 가져오기
export const getCustomRecipesByBean = (beanName: string) => {
  return customRecipes.filter(recipe => recipe.targetBean?.name === beanName);
};