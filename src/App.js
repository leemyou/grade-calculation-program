import "./Style/App.css"
import Table from "./Component/Table";
import tableData from './Data/Data.json'

function App() {
  console.log(tableData.one);

  // 학년별 분류하기  // 배열 형태
  const grade1 = tableData.one;
  // const grade2 = tableData.two;
  // const grade3 = tableData.three;

  return (
    <div className="App">
      <div className='title'>
        <h1>front-end 개발실습 과제</h1>
        <h3>202045060 임효현</h3>
      </div>

      <Table grade="1" data={grade1}/>
    </div>
  );
}

export default App;
