# 리팩터링 2판
### 코드 구조를 체계적으로 개선하여 효율적인 리팩터링 구현하기

리팩터링을 하기전에 항상 테스트코드를 작성하기를 이 책에서 권하고 있다.  
때문에 본문에는 없지만 테스트도구 JEST 를 사용하여 테스트코드를 직접 작성하고 리팩토링 과정을 따라가려고 한다.
  
```bash
npm init -y
npm i -D jest babel-jest @babel/core @babel/preset-env
```


- 추출 작업전 지역변수부터 제거
- 유효범위를 신경써야할 대상이 줄어든다.
- 특별한 경우가 아니라면 성능문제는 일단 무시하고 리팩터링을 진행
- 만약 리팩터링으로 성능이 떨어진다면 마무리하고나서 성능을 개선하라

### volumeCredits 변수를 제거하는 작업의 단계를 4단계에 걸처서 수행
1. 반복문 쪼개기로 변수 값을 누적시키는 부분을 분리
2. 문장슬라이드하기로 변수 초기화 문장을 변수 값 누적 코드 바로 앞으로 이동
3. 함수 추출하기로 적립 포인트 계산 부분을 별도 함수로 추출
4. 변수 인라인하기로 volumeCredits 변수를 제거

### 계산 단계와 포맷팅 단계 분리하기
골격은 충분히 개선되었다.  
이제 `statement()` 의 HTML 버전을 만드는 작업을 진행한다.  
`단계쪼개기` 방법 사용


## 1.8 다형성을 활용해 계산 코드 재구성 하기
- 연극장르 추가
- 장르마다 공연료와 적립 포인트 계산법을 다르게 지정
- amountFor() 에서 연극 장르에 따라 계산방식이 달라짐
- 코드 수정 횟수가 늘어날수록 골칫거리가 될 수 있다.
### 목표
- 상속 계층을 구성해서 희극 서브클래스와 비극 서브클래스가 각자의 구체적인 계산 로직을 정의하는것
- 호출하는 쪽은 다형성 버전의 고연료 계산 함수를 호출
- 핵심은 조건부 로직을 다형성으로 바꾸기

### 공연료 계산기를 다형성 버전으로 만들기
클래스에 로직을 담는 작업 완료  
다형성을 지원하도록 만들어야 하는데 가장 먼저 해야할일은
`타입 코드를 서브클래스로 바꾸기` 이다.  
PerformanceCalculator 의 서브 클래스들을 준비하고   
createStatementData() 에서 그중 적합한 서브클래스를 사용하게 만들어야 함
  
자스에서는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문에   
`생성자를 팩터리함수로 바꾸기`를 적용한다.


## 마무리
이번에 사용된 리팩터링 기법으로
- 함수 추출하기
- 변수 인라인하기
- 함수 옮기기
- 조건부 로직을 다형성으로 바꾸기
  
`좋은 코드를 가늠하는 확실한 방법은 얼마나 수정하기 쉬운가 이다.`
   
리팩터링 맛보기 챕터를 보면서 느낀점
- I/O 가 명확한 테스트 코드를 작성  
테스트코드를 실행함으로 지속적으로 안정적인 결과값이 리턴되고있다고 확인할 수 있기때문에 빠르게 잘못된 부분을 캐치하고 수정할 수 있었다.  
코드를 보고 이해하려고하면서 따라작성하지만 오타가 발생하거나 잘못된 위치에 함수를 만들거나 제거하거나 추가해야할 코드를 그냥 넘어가기도 했었는데 그때마다 테스트코드결과를 확인하면서 바로바로 수정할 수 있었던점에서 실시간으로 그 효용성을 체감했다.  
- 코드를 분할하고 수정하는 과정  
코드를 역할별로 함수와 클래스를 구분하여 다형성까지 고려하여 작성되는 점이 흥미로웠다.  
그리고 해당 과정을 진행하면서 동일한 기능을 수행하는 수정사항이 발생할때마다 테스트 커밋하는 과정또한 귀찮지만 정말 필요한 습관이다 라는 생각이 들었다.
