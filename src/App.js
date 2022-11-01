import "./Style/App.css"
import Tables from "./Component/Table";
import tableData from './Data/Data.json'

function App() {

  const headerData = ['이수', '필수', '과목명', '학점', '출석점수', '과제점수', '중간고사', '기말고사', '총점', '평균', '성적']

  // 학년별 분류하기  // 배열 형태
  const grade1 = tableData.one;
  const grade2 = tableData.two;
  const grade3 = tableData.three;

  return (
    <div className="App">
      <div className='title'>
        <h1>front-end 개발실습 과제</h1>
        <h3>202045060 임효현</h3>
      </div>

      <Tables grade="1" header={headerData} data={grade1}/>
      <Tables grade="2" header={headerData} data={grade2}/>
      <Tables grade="3" header={headerData} data={grade3}/>

      <div className="notesReference">
        <h5>✔️ 참고 사항</h5>
        <ol>
          <li>성적은 출결 20, 과제 20, 중간 30, 기말 30만 입력됩니다.</li>
          <li>체크박스에 체크한 후 삭제버튼을 누르면 삭제 가능합니다.</li>
          <li>새로고침(F5)을 하면 변경사항이 초기화됩니다.</li>
          <li>추가버튼을 누르면 내용을 초기화할 수 있는 초기화 버튼이 나타납니다.</li>
          <li>총합 평균은 소수점 2자리까지만 보입니다.</li>
          <li>1학점 과목은 학점에는 포함되나 성적에는 영향을 미치지 않습니다.</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
