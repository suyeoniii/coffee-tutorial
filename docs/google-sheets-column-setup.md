# Google Sheets 컬럼 설정 가이드

구글 시트에 CSV 파일을 가져온 후, 다음과 같이 컬럼을 설정하세요.

## 1. Beans 시트

**헤더 행 (1행):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| id | name | description | notes | origin | imageUrl |

**예시 데이터 (2행부터):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| bean1 | 에티오피아 예가체프 | 밝고 과일향이 풍부한 단일 원두 | 레몬,베리,플로랄 | 에티오피아 | https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400 |

## 2. Recipes 시트

**헤더 행 (1행):**
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| id | name | type | description | temperature | difficulty | method | dripper | imageUrl | bean_amount | grind_size | water_temperature | water_amount | brew_time | step1 | step2 | step3 | step4 | step5 | step6 | acidity | body | sweetness | bitterness | memo | recommendedBeans |

**예시 데이터 (2행부터):**
- A1: `recipe1`
- B1: `테츠카스야 4:6 레시피`
- C1: `preset`
- D1: `균형잡힌 맛을 위한 4:6 레시피`
- E1: `따뜻`
- F1: `중급`
- G1: `푸어오버`
- H1: `V60`

## 3. DetailedSteps 시트

**헤더 행 (1행):**
| A | B | C | D | E |
|---|---|---|---|---|
| id | recipe_name | title | timeAndAmount | description |

**예시 데이터 (2행부터):**
| A | B | C | D | E |
|---|---|---|---|---|
| step1 | 테츠카스야 4:6 레시피 | 1차 추출 | 0분 0초부터, 60g까지 | 중앙에서 원을 그리며 천천히 붓기 |

## 중요 사항

1. **A열은 반드시 ID가 있어야 합니다** (비어있으면 자동 생성됨)
2. **B열의 레시피 이름은 DetailedSteps 시트의 recipe_name과 일치해야 합니다**
3. 빈 셀은 기본값으로 자동 채워집니다
4. CSV 파일을 가져온 후 시트 이름을 `Beans`, `Recipes`, `DetailedSteps`로 변경하세요 