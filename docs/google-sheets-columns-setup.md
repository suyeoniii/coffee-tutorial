# 구글 시트 컬럼 설정 가이드

## 🎯 3개 시트 생성 및 컬럼 설정

### 1️⃣ **Beans 시트** 설정

**1단계: 헤더 행 (첫 번째 행) 입력**
```
A1: name
B1: description  
C1: notes
D1: origin
E1: imageUrl
```

**2단계: 데이터 예시 (두 번째 행부터)**
| A | B | C | D | E |
|---|---|---|---|---|
| 에티오피아 예가체프 | 밝고 과일향이 풍부한 단일 원두 | 레몬,베리,플로랄 | 에티오피아 | https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400 |
| 케냐 AA | 강렬한 산미와 와인같은 바디 | 블랙커런트,와인,시트러스 | 케냐 | https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400 |
| 콜롬비아 수프리모 | 균형잡힌 바디와 부드러운 산미 | 카라멜,초콜릿,견과류 | 콜롬비아 | https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400 |

---

### 2️⃣ **Recipes 시트** 설정

**1단계: 헤더 행 (첫 번째 행) 입력**
```
A1: id                    
B1: name                  
C1: description           
D1: method               
E1: dripper              
F1: temperature          
G1: difficulty           
H1: type                 
I1: beanAmount           
J1: grindSize            
K1: waterTemperature     
L1: waterAmount          
M1: brewTime             
N1: steps                
O1: imageUrl             
P1: targetBean           
Q1: recommendedBeans     
R1: acidity              
S1: body                 
T1: sweetness            
U1: bitterness           
V1: memo                 
```

**2단계: 프리셋 레시피 예시**
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | V60 클래식 드립 | 균형잡힌 맛을 위한 기본 V60 레시피 | 푸어오버 | V60 | 따뜻 | 초급 | preset | 20g | 중세 | 92-94°C | 320ml | 2분 30초 | 필터를 린싱하고 드리퍼를 예열합니다\|커피 20g을 중세로 분쇄하여 넣습니다\|40ml의 물로 30초간 블루밍합니다 | https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400 | | 에티오피아 예가체프,케냐 AA,콜롬비아 수프리모 | | | | | |

**3단계: 커스텀 레시피 예시**
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| custom-1 | V60 밝은 산미 강조 | 예가체프의 과일향과 산미를 극대화한 레시피 | 푸어오버 | V60 | 따뜻 | 중급 | custom | 18g | 중세 | 94°C | 300ml | 2분 15초 | 필터를 린싱하고 드리퍼를 예열합니다\|커피 18g을 중세로 분쇄합니다 | https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400 | 에티오피아 예가체프 | | 5 | 2 | 3 | 1 | 과일향을 극대화하고 싶을 때 추천 |

---

### 3️⃣ **DetailedSteps 시트** 설정

**1단계: 헤더 행 (첫 번째 행) 입력**
```
A1: recipeId
B1: title
C1: timeAndAmount
D1: description
```

**2단계: 상세 단계 예시**
| A | B | C | D |
|---|---|---|---|
| 1 | 블루밍 | 0분 00초 ~ 0분 30초, 40ml | 가루 전체가 젖도록 천천히 부어주세요. |
| 1 | 1차 추출 | 0분 30초 ~ 1분 10초, 120ml까지 (총 160ml) | 중앙에서 바깥으로 나선형으로 부어주세요. |
| 1 | 2차 추출 | 1분 10초 ~ 1분 50초, 240ml까지 (총 280ml) | 조금 더 빠른 속도로 부어주세요. |
| 1 | 3차 추출 | 1분 50초 ~ 2분 30초, 320ml까지 (총 320ml) | 천천히 마무리해주세요. |

---

## 📝 **단계별 설정 방법**

### **Step 1: 구글 시트 접속**
1. [Google Sheets](https://sheets.google.com) 접속
2. **"빈 스프레드시트"** 클릭
3. 제목을 **"Coffee Tutorial Data"**로 변경

### **Step 2: 시트 이름 변경**
1. 하단의 **"시트1"** 탭 우클릭
2. **"이름 바꾸기"** 선택
3. **"Beans"**로 변경

### **Step 3: 추가 시트 생성**
1. 하단 **"+"** 버튼 클릭하여 새 시트 생성
2. 새 시트 이름을 **"Recipes"**로 변경
3. 다시 **"+"** 버튼 클릭하여 또 다른 시트 생성
4. 새 시트 이름을 **"DetailedSteps"**로 변경

### **Step 4: 각 시트에 헤더 입력**

**📊 Beans 시트:**
- A1에 `name` 입력
- B1에 `description` 입력
- C1에 `notes` 입력
- D1에 `origin` 입력
- E1에 `imageUrl` 입력

**📊 Recipes 시트:**
- A1부터 V1까지 위의 헤더 순서대로 입력

**📊 DetailedSteps 시트:**
- A1에 `recipeId` 입력
- B1에 `title` 입력
- C1에 `timeAndAmount` 입력
- D1에 `description` 입력

### **Step 5: 데이터 입력 팁**

**🔹 notes 컬럼 (쉼표로 구분)**
```
레몬,베리,플로랄
```

**🔹 steps 컬럼 (파이프로 구분)**
```
필터를 린싱하고 드리퍼를 예열합니다|커피 20g을 중세로 분쇄하여 넣습니다|40ml의 물로 30초간 블루밍합니다
```

**🔹 recommendedBeans 컬럼 (쉼표로 구분)**
```
에티오피아 예가체프,케냐 AA,콜롬비아 수프리모
```

### **Step 6: 공유 설정**
1. 우상단 **"공유"** 버튼 클릭
2. **"일반 액세스"** 변경 클릭
3. **"링크가 있는 모든 사용자"** 선택
4. 권한을 **"뷰어"**로 설정
5. **"완료"** 클릭

### **Step 7: 스프레드시트 ID 복사**
- 브라우저 주소창에서 스프레드시트 ID 복사
- 예: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
- 여기서 `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`가 스프레드시트 ID

---

## ⚠️ **주의사항**

### **데이터 타입**
- **숫자 필드**: `acidity`, `body`, `sweetness`, `bitterness` (1-5 범위)
- **선택 값**: 
  - `temperature`: "따뜻" 또는 "아이스"
  - `difficulty`: "초급", "중급", "고급"
  - `type`: "preset" 또는 "custom"

### **필수 vs 선택 필드**
- **프리셋 레시피**: P, R, S, T, U, V 컬럼은 비워둠
- **커스텀 레시피**: Q 컬럼은 비워두고 P, R, S, T, U, V 컬럼 입력

### **이미지 URL**
- Unsplash 등 무료 이미지 서비스 URL 사용
- 예: `https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400`

이제 구글 시트가 완벽하게 설정되었습니다! 🎉 