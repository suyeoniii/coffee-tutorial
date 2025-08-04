import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'V60 클래식 드립',
    description: '균형잡힌 맛을 위한 기본 V60 레시피',
    method: '푸어오버',
    dripper: 'V60',
    temperature: '따뜻',
    difficulty: '초급',
    brewingParams: {
      beanAmount: '20g',
      grindSize: '중세',
      waterTemperature: '92-94°C',
      waterAmount: '320ml',
      brewTime: '2분 30초'
    },
    recommendedBeans: [
      {
        name: '에티오피아 예가체프',
        description: '밝고 과일향이 풍부한 단일 원두',
        notes: ['레몬', '베리', '플로랄'],
        origin: '에티오피아'
      },
      {
        name: '케냐 AA',
        description: '강렬한 산미와 와인같은 바디',
        notes: ['블랙커런트', '와인', '시트러스'],
        origin: '케냐'
      },
      {
        name: '콜롬비아 수프리모',
        description: '균형잡힌 바디와 부드러운 산미',
        notes: ['카라멜', '초콜릿', '견과류'],
        origin: '콜롬비아'
      }
    ],
    steps: [
      '필터를 린싱하고 드리퍼를 예열합니다',
      '커피 20g을 중세로 분쇄하여 넣습니다',
      '40ml의 물로 30초간 블루밍합니다',
      '원을 그리며 천천히 물을 부어줍니다',
      '총 추출시간 2분 30초를 목표로 합니다'
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
    brewingParams: {
      beanAmount: '22g',
      grindSize: '중간',
      waterTemperature: '90-92°C',
      waterAmount: '350ml',
      brewTime: '3분'
    },
    recommendedBeans: [
      {
        name: '콜롬비아 수프리모',
        description: '균형잡힌 바디와 부드러운 산미',
        notes: ['카라멜', '초콜릿', '견과류'],
        origin: '콜롬비아'
      },
      {
        name: '브라질 산토스',
        description: '부드럽고 달콤한 클래식 원두',
        notes: ['견과류', '카라멜', '바닐라'],
        origin: '브라질'
      }
    ],
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
    brewingParams: {
      beanAmount: '30g',
      grindSize: '중굵은',
      waterTemperature: '95°C',
      waterAmount: '500ml',
      brewTime: '4분'
    },
    recommendedBeans: [
      {
        name: '과테말라 안티구아',
        description: '진한 바디와 스모키한 풍미',
        notes: ['다크초콜릿', '스파이스', '토바코'],
        origin: '과테말라'
      },
      {
        name: '에티오피아 시다모',
        description: '복합적인 과일향과 꽃향',
        notes: ['베리', '초콜릿', '꽃향'],
        origin: '에티오피아'
      }
    ],
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
    brewingParams: {
      beanAmount: '25g',
      grindSize: '중세',
      waterTemperature: '95°C',
      waterAmount: '250ml + 얼음 150g',
      brewTime: '2분'
    },
    recommendedBeans: [
      {
        name: '케냐 AA',
        description: '강렬한 산미와 와인같은 바디',
        notes: ['블랙커런트', '와인', '시트러스'],
        origin: '케냐'
      },
      {
        name: '에티오피아 예가체프',
        description: '밝고 과일향이 풍부한 단일 원두',
        notes: ['레몬', '베리', '플로랄'],
        origin: '에티오피아'
      }
    ],
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
    brewingParams: {
      beanAmount: '30g',
      grindSize: '굵은',
      waterTemperature: '96°C',
      waterAmount: '500ml',
      brewTime: '4분'
    },
    recommendedBeans: [
      {
        name: '브라질 산토스',
        description: '부드럽고 달콤한 클래식 원두',
        notes: ['견과류', '카라멜', '바닐라'],
        origin: '브라질'
      },
      {
        name: '과테말라 안티구아',
        description: '진한 바디와 스모키한 풍미',
        notes: ['다크초콜릿', '스파이스', '토바코'],
        origin: '과테말라'
      }
    ],
    steps: [
      '프렌치프레스를 뜨거운 물로 예열합니다',
      '커피 30g을 굵게 분쇄하여 넣습니다',
      '뜨거운 물을 한 번에 모두 부어줍니다',
      '4분간 우려낸 후 플런저를 천천히 내립니다',
      '바로 다른 용기로 옮겨 과추출을 방지합니다'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400'
  }
];