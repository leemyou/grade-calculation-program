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
    </div>
  );
}

export default App;
