# 구글 시트 API 설정 및 사용 가이드

## 🎯 완료된 작업

✅ **구글 시트 API 서비스 구현**
- `lib/googleSheetsService.ts` - API 호출 및 데이터 파싱
- 캐싱 기능 (5분간)
- 에러 핸들링

✅ **데이터 레이어 통합**
- `data/index.ts` - 구글 시트와 로컬 데이터 병행 지원
- API 라우트: `/api/recipes`, `/api/beans`
- 클라이언트 훅: `useRecipes()`, `useBeans()`

✅ **타입 정의 확장**
- `BrewingStep` 인터페이스 추가
- 기존 `Recipe` 타입에 `detailedSteps` 필드 추가

## 🚀 사용 방법

### 1단계: 구글 시트 설정

1. **새 구글 스프레드시트 생성**
   - [Google Sheets](https://sheets.google.com) 접속
   - 새 스프레드시트 생성
   - 이름: "Coffee Tutorial Data"

2. **시트 구성** (3개 시트 필요)
   - `Beans` - 원두 정보
   - `Recipes` - 레시피 기본 정보  
   - `DetailedSteps` - 상세 추출 단계

3. **데이터 구조**
   - 📋 자세한 구조는 `docs/google-sheets-structure.md` 참조

### 2단계: Google Sheets API 설정

1. **Google Cloud Console 설정**
   ```
   1. console.cloud.google.com 접속
   2. 새 프로젝트 생성 또는 기존 프로젝트 선택
   3. "API 및 서비스" → "라이브러리"
   4. "Google Sheets API" 검색 → 활성화
   5. "사용자 인증 정보" → "API 키" 생성
   ```

2. **스프레드시트 공유**
   ```
   1. 스프레드시트에서 "공유" 클릭
   2. "링크가 있는 모든 사용자" 설정
   3. 권한: "뷰어"
   4. URL에서 스프레드시트 ID 복사
   ```

### 3단계: 환경변수 설정

`.env.local` 파일 생성:
```env
# 구글 시트 API 설정
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here

# 구글 시트 사용 활성화
NEXT_PUBLIC_USE_GOOGLE_SHEETS=true

# 시트 이름 설정 (선택사항)
RECIPES_SHEET_NAME=Recipes
BEANS_SHEET_NAME=Beans
DETAILED_STEPS_SHEET_NAME=DetailedSteps
```

### 4단계: 애플리케이션 실행

```bash
pnpm dev
```

## 🔄 데이터 소스 전환

### 로컬 데이터 사용 (기본값)
```env
NEXT_PUBLIC_USE_GOOGLE_SHEETS=false
```

### 구글 시트 데이터 사용
```env
NEXT_PUBLIC_USE_GOOGLE_SHEETS=true
```

## 📊 데이터 흐름

```
구글 시트 ↔ API 서비스 ↔ 캐시 ↔ API 라우트 ↔ 클라이언트 훅 ↔ 컴포넌트
     ↓ (fallback)
  로컬 데이터
```

## 🎯 주요 특징

- **자동 fallback**: 구글 시트 오류 시 로컬 데이터 사용
- **캐싱**: 5분간 데이터 캐시로 API 호출 최소화
- **타입 안전성**: TypeScript로 모든 데이터 구조 보장
- **실시간 업데이트**: 구글 시트 수정 시 5분 내 반영

## 🔧 트러블슈팅

### API 키 오류
```
Error: The request is missing a valid API key
```
→ `.env.local`의 `GOOGLE_SHEETS_API_KEY` 확인

### 스프레드시트 접근 오류
```
Error: The caller does not have permission
```
→ 스프레드시트 공유 설정 확인 (링크가 있는 모든 사용자)

### 데이터 파싱 오류
```
Error: Cannot read property of undefined
```
→ 구글 시트의 헤더와 데이터 형식 확인

## 📝 데이터 관리

### 구글 시트에서 레시피 추가
1. `Recipes` 시트에 새 행 추가
2. 모든 필수 컬럼 입력
3. `DetailedSteps` 시트에 해당 레시피 ID로 단계 추가
4. 5분 후 웹사이트에 자동 반영

### 원두 추가
1. `Beans` 시트에 새 행 추가
2. 모든 필드 입력
3. `Recipes` 시트에서 해당 원두 참조 가능 