# Front-end 개발 실습 2022 과제
 성적 계산 시스템
<br><br><br><br>

# Description 
간단한 대학생 성적 계산 프로그램.


<br><br>


# <span style='color:orange'>Implementation Conditions</span>

### 기본 조건

1. 개발은 한 학기 동안 배운 언어로 개발할 것

2. 과목명은 좌측 정렬로 하되, 나머지 칸은 모두 중앙 정렬할 것

3. 열마다의 색을 입힐 것

4. 별도의 환경 설정이나 프로그램을 설치하지 않고 바로 실행 가능한 환경으로 만들 것.

<br>

### 추가버튼을 눌렀을 시 조건

1. 줄이 추가되고 저장 버튼을 클릭하면 합계 등이 계산될 것.

2. 이미 input이 있다면 추가버튼을 reset버튼으로 변경할 것.

3. F 학점이라면 학점에는 반영되나 총점엔 포함 안되도록 할 것.


### 저장버튼을 눌렀을 시 조건
1. input 열이 삭제되면서 배열에 value를 추가할 것.

2. 추가 사항 없이 누르면 경고 alert창을 추가할 것.

4. input값에 숫자만 들어가야하는 부분(출석, 과제, 중간, 기말 점수)을 체크할 것

5. 출석, 과제, 중간, 기말 점수에 입력 최소와 최대값을 주고, 이에 미만이거나 초과하면 alert창으로 경고를 보여줄 것

6. 같은 학기에 같은 이수, 필수, 과목명이 모두 곂치는 과목이 들어오면 막을 것

7. 학점이 1학점이면 P/NP로 계산할 것

8. 각 과목의 총점, 성적, 합계란의 모든 행은 input 값을 기준으로 계산할 것
    > 단, 학점이 'F'인 경우는 빨간색으로 표시할 것

<br>

### 삭제버튼을 눌렀을 시, 조건
1. 체크 박스 또는 해당 줄을 마우스로 클릭한 후 버튼을 클릭 시 해당 줄을 삭제하며, 합계 등이 다시 계산될 것

2. input 열에도 체크박스를 추가하고 저장하기 전에 삭제를 원하면 삭제 가능하도록 할 것


### 최종 총합열의 조건
1. 마지막의 줄 합계(이수~과목명) 셀은 셀을 병합할 것

2. 합계 평균은 소수점 2자리까지 보이도록 할 것

<br>


<Br>

# Errors in the development process
1. 과목명 다음에 탭 버튼 누르면 학점 체크란만 alert창 여러개 뜨는 오류
    > 학점 체크란을 1~3학점까지만 입력할 수 있도록 드롭다운 버튼으로 수정함

2. styled-component 사용 과정에서 rotate를 props값에 따라서 받아올 수 없었음
    > jquery 라이브러리를 활용하여 hide 클래스를 추가하여 화살표를 180deg 돌리는 것 구현