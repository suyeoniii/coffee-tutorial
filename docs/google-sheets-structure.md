# 구글 시트 데이터 구조

## 필요한 시트 3개

### 1. Beans 시트
원두 정보를 관리하는 시트

| 컬럼 | 필드명 | 데이터 타입 | 예시 |
|------|--------|-------------|------|
| A | name | 텍스트 | 에티오피아 예가체프 |
| B | description | 텍스트 | 밝고 과일향이 풍부한 단일 원두 |
| C | notes | 텍스트 (쉼표구분) | 레몬,베리,플로랄 |
| D | origin | 텍스트 | 에티오피아 |
| E | imageUrl | URL | https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400 |

### 2. Recipes 시트
레시피 기본 정보를 관리하는 시트

| 컬럼 | 필드명 | 데이터 타입 | 예시 |
|------|--------|-------------|------|
| A | id | 텍스트 | 1 |
| B | name | 텍스트 | V60 클래식 드립 |
| C | description | 텍스트 | 균형잡힌 맛을 위한 기본 V60 레시피 |
| D | method | 텍스트 | 푸어오버 |
| E | dripper | 텍스트 | V60 |
| F | temperature | 텍스트 | 따뜻 또는 아이스 |
| G | difficulty | 텍스트 | 초급, 중급, 고급 |
| H | type | 텍스트 | preset 또는 custom |
| I | beanAmount | 텍스트 | 20g |
| J | grindSize | 텍스트 | 중세 |
| K | waterTemperature | 텍스트 | 92-94°C |
| L | waterAmount | 텍스트 | 320ml |
| M | brewTime | 텍스트 | 2분 30초 |
| N | steps | 텍스트 (파이프구분) | 필터를 린싱하고 드리퍼를 예열합니다\|커피 20g을 중세로 분쇄하여 넣습니다 |
| O | imageUrl | URL | https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400 |
| P | targetBean | 텍스트 | 에티오피아 예가체프 (커스텀 레시피용) |
| Q | recommendedBeans | 텍스트 (쉼표구분) | 에티오피아 예가체프,케냐 AA (프리셋 레시피용) |
| R | acidity | 숫자 | 5 (커스텀 레시피용, 1-5) |
| S | body | 숫자 | 2 (커스텀 레시피용, 1-5) |
| T | sweetness | 숫자 | 3 (커스텀 레시피용, 1-5) |
| U | bitterness | 숫자 | 1 (커스텀 레시피용, 1-5) |
| V | memo | 텍스트 | 과일향을 극대화하고 싶을 때 추천 (커스텀 레시피용) |

### 3. DetailedSteps 시트
상세 추출 단계 정보를 관리하는 시트

| 컬럼 | 필드명 | 데이터 타입 | 예시 |
|------|--------|-------------|------|
| A | recipeId | 텍스트 | 1 |
| B | title | 텍스트 | 블루밍 |
| C | timeAndAmount | 텍스트 | 0분 00초 ~ 0분 30초, 40ml |
| D | description | 텍스트 | 가루 전체가 젖도록 천천히 부어주세요. |

## 구글 시트 설정 방법

### 1단계: 새 구글 스프레드시트 생성
1. Google Sheets (sheets.google.com) 접속
2. 새 스프레드시트 생성
3. 이름을 "Coffee Tutorial Data"로 변경

### 2단계: 시트 구성
1. 기본 "시트1"을 "Beans"로 이름 변경
2. "Recipes" 시트 추가
3. "DetailedSteps" 시트 추가

### 3단계: 헤더 행 추가
각 시트의 첫 번째 행에 위 표의 필드명을 헤더로 입력

### 4단계: 공유 설정
1. 시트 우상단 "공유" 버튼 클릭
2. "링크가 있는 모든 사용자"로 설정
3. 권한을 "뷰어"로 설정
4. URL에서 스프레드시트 ID 복사 (예: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms)

### 5단계: Google Sheets API 활성화
1. Google Cloud Console (console.cloud.google.com) 접속
2. 프로젝트 생성 또는 선택
3. "API 및 서비스" > "라이브러리" 이동
4. "Google Sheets API" 검색 후 활성화
5. "사용자 인증 정보" > "사용자 인증 정보 만들기" > "API 키" 선택
6. API 키 복사

## 환경변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
RECIPES_SHEET_NAME=Recipes
BEANS_SHEET_NAME=Beans
DETAILED_STEPS_SHEET_NAME=DetailedSteps
``` 