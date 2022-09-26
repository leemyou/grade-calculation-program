import React, { useState } from "react";
import styled from 'styled-components'
import Table from 'react-bootstrap/Table';
import TR from './InputTr';


const Tables = (props) => {

  // console.log(props)
  const grade = props.grade;
  const header = props.header;
  const data = props.data;
  const [datas, setDatas] = useState([data])  // 컴포넌트를 re-render 시켜주기 위함
  
  const tableID = `tables${grade}`
  const [addTR, setAddTR] = useState([]);   // TR컴포넌트의 추가 관리
  const [saveData ,setSavedData] = useState([]);      // saveData(추가되는 데이터) 관리
  const [btnDisplay, setBtnDisplay] = useState(true); // 초기화, 추가 버튼의 display 관리

  // 버튼 onClick 이벤트
  /**
   * 추가 버튼 onClick
   */
  const btnAdd = () => {
    const thisTable = document.getElementById(`tables${grade}`)

    if(thisTable.querySelector('select')){
      alert('작업중인 내용을 저장한 후 열을 추가해주세요.')
    }else{
      setAddTR(addTR.concat(<TR grade={grade} id='newTr'/>))
      setBtnDisplay(!btnDisplay)
    }
  }

  /**
   * 저장버튼 onClick
   */
  const btnSave = () => {
    const thisTable = document.getElementById(`tables${grade}`)

    // 데이터 저장
    const completeValue = document.getElementById('inputComplete').value
    const essentialValue = document.getElementById('inputEssential').value
    const subjectValue = document.getElementById('inputSubject').value
    const creditValue = document.getElementById('inputCredit').value
    const attendValue = document.getElementById('inputAttend').value
    const reportValue = document.getElementById('inputReport').value
    const midValue = document.getElementById('inputMid').value
    const finValue = document.getElementById('inputFin').value

    // null값 체크
    if( !subjectValue || !creditValue || !attendValue || 
      !reportValue || !midValue || !finValue){
        alert('빈 값을 채워주시거나 학점,과제점수, 중간고사, 기말고사는 숫자로 채워주세요')
    }
    else{
      var score = []
      score.push(attendValue)
      score.push(reportValue)
      score.push(midValue)
      score.push(finValue)
  
      const saveData = {
        id: data.length+1,
        complete: completeValue,
        essential: essentialValue,
        subject: subjectValue,
        credit: creditValue,
        score: score
      }
      setSavedData(saveData)
  
      // input이 들어간 행 삭제
      thisTable.deleteRow(1)
  
      // 데이터가 들어간 열 추가
      data.push(saveData)
      setDatas({
        ...datas
      })
  
      setBtnDisplay(!btnDisplay)

    }
  }
  console.log(saveData) // 이게 있어야 밑에 successfully안뜨는데 이거 어떻게 해야하나..

  /**
   * 삭제버튼 onClick
   */
  const btnDelete = () => {
    const thisTable = document.getElementById(`tables${grade}`)
    
    const query = `input[name='${grade}']:checked`;
    const selectedEls = document.querySelectorAll(query);

    let result = [];
    selectedEls.forEach((el) => {
      result.push(el.value);
    })
    console.log(result)
    if(result.length === 0){
      alert('삭제하고싶은 요소를 체크 후 삭제 버튼을 눌러주세요');
    }
    // 아예 data에서 없애버려야함
    if(result.includes('on')){
      // 첫번째 input 줄 제거
      thisTable.deleteRow(1)
    }
    if(result.length !== 0 && !result.includes('on')){
    for(var i=0; i<result.length; i++){ //[0, 1]
      const wantDeleteData = parseInt(result[i])
      data.splice(wantDeleteData, 1)
    }
    setDatas(data)
    }

    console.log(data)
  }

  /**
   * 초기화 버튼 onClick
   */
  const btnReset = () => {
    document.getElementById('inputSubject').value = ''
    document.getElementById('inputCredit').value = ''
    document.getElementById('inputAttend').value = ''
    document.getElementById('inputReport').value = ''
    document.getElementById('inputMid').value = ''
    document.getElementById('inputFin').value = ''
  }


  // 컴포넌트에서 사용하는 계산
  /**
   * 총 학점 계산
   * @returns (int)total
   */
  const totalCredit = () => {
    var total = 0
    for(var i=0; i<data.length; i++){
      total += parseInt(data[i].credit)
    }
    return total;
  }
  
  /**
   * 총합 점수(출석점수, 과제점수, 중간, 기말) 계산
   * @param {int} num 
   * @returns (int)total
   */
  const totalScore = (num) => {
    var total = 0
    for(var i=0; i<data.length; i++){
      total += parseInt(data[i].score[num])
    }
    return total;
  }

  /**
   * 총합 성적 계산
   * @returns (int)total
   */
  const totalGrade = () => {
    var totalItem = (totalScore(0)+totalScore(1)+totalScore(2)+totalScore(3))/data.length
    
    if(totalItem>95){
      return 'A+'
    }else if(totalItem>=90){
      return 'A0'
    }else if(totalItem>=85){
      return 'B+'
    }else if(totalItem>=80){
      return 'B0'
    }else if(totalItem>=75){
      return 'C+'
    }else if(totalItem>=70){
      return 'C0'
    }else if(totalItem>=65){
      return 'D+'
    }else if(totalItem>=60){
      return 'D0'
    }else{
      return 'F'
    }
  }


  return(
    <MainWrap>
        <div className="title-box">
          <h2>{grade}학년</h2>
          <div className="btn-box">
            <Btn onClick={btnReset} display={btnDisplay}>초기화</Btn>
            <Btn onClick={btnAdd} display={!btnDisplay}>추가</Btn>
            <Btn onClick={btnSave}>저장</Btn>
            <Btn onClick={btnDelete}>삭제</Btn>
          </div>
        </div>

        <Table striped id={tableID}>
          <Thead>
            <tr>
              <th>체크</th>
            {
              header.map((item) => {
                return <th>{item}</th>
              })
            }
            </tr>
          </Thead>
          <Tbody>
            { addTR }
            {data.map((item) => {
              const totalItem = parseInt(item.score[0])+parseInt(item.score[1])+parseInt(item.score[2])+parseInt(item.score[3])
              const clacGrade = (totalItem) => {
                if(item.score[0]==='0'){  // 결석 4번은 F
                  return 'F'
                }
                else if(totalItem>=95){
                  return 'A+'
                }else if(totalItem>=90){
                  return 'A0'
                }else if(totalItem>=85){
                  return 'B+'
                }else if(totalItem>=80){
                  return 'B0'
                }else if(totalItem>=75){
                  return 'C+'
                }else if(totalItem>=70){
                  return 'C0'
                }else if(totalItem>=65){
                  return 'D+'
                }else if(totalItem>=60){
                  return 'D0'
                }else{
                  return 'F'
                }
              }
                return(
                  <tr >
                    <td><input type="checkbox" value={item.id} name={grade} id={item.id}/></td>
                    <td>{item.complete}</td>
                    <td>{item.essential}</td>
                    <td className="tdSubject">{item.subject}</td>
                    <td>{item.credit}</td>
                    <td>{item.score[0]}</td>
                    <td>{item.score[1]}</td>
                    <td>{item.score[2]}</td>
                    <td>{item.score[3]}</td>
                    <td>{totalItem}</td>
                    <td></td>
                    <td style={{color: clacGrade(totalItem)==='F' ? 'red' : 'var(--gray900)'}}>{clacGrade(totalItem)}</td>
                  </tr>
                )
              })
            }
            <ResultTr>
              <td colSpan='4'>합계</td>
              <td>{totalCredit()}</td>  {/* 여기는 왜 괄호 써야하는지 모르것네 */}
              <td>{totalScore(0)}</td>
              <td>{totalScore(1)}</td>
              <td>{totalScore(2)}</td>
              <td>{totalScore(3)}</td>
              <td>{totalScore(0)+totalScore(1)+totalScore(2)+totalScore(3)}</td>
              <td>{(totalScore(0)+totalScore(1)+totalScore(2)+totalScore(3))/data.length}</td>
              <td>{totalGrade()}</td>
            </ResultTr>
          </Tbody>
        </Table>

    </MainWrap>
  )
}
export default Tables;


// styled component
const MainWrap = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  margin-bottom: 30px;
  /* background-color: indigo; */
  .title-box{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    background-color: var(--gray500);
    height: 40px;

    > h2{
      font-size: 22px;
    }
  }
`
const Btn = styled.button`
  display: ${props => props.display===true ? 'none' : 'inline-block'};
  padding: 3px 7px;
  margin-left: 7px;
  border: none;
  transition: 0.2s;
  background-color:var(--gray100);
  :hover{
    background-color: var(--gray200);
  }
  :active{
    background-color: var(--gray400);
    color: var(--gray50);
  }
`
const Thead = styled.thead`
  text-align: center;
`
const Tbody = styled.tbody`
  text-align: center;
  width: 100%;

  .tdSubject{
    text-align: left;
  }

  input{
    width: 100%;
  }
`
const ResultTr = styled.tr`
  background-color: var(--gray200);
`