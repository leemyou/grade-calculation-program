import React, { useState } from "react";
import styled from 'styled-components'
import Table from 'react-bootstrap/Table';
import TR from './InputTr';
import SlideToggle from "react-slide-toggle";


const Tables = (props) => {

  const grade = props.grade;
  const header = props.header;
  const [data, setData] = useState(props.data)

  const tableID = `tables${grade}`
  const [addTR, setAddTR] = useState([]);   // TR컴포넌트의 추가 관리
  const [, setSavedData] = useState([]);      // saveData(추가되는 데이터) 관리
  const [btnDisplay, setBtnDisplay] = useState(true); // 초기화, 추가 버튼의 display 관리

  const [showTable, setShowTable] = useState(true);

  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [inputCheckBox, setInputCheckBox] = useState(false)

  /**
   * 이미 동일 과목이 존재하는지 확인하는 함수 /
   * 이수, 필수, 과목명이 매개변수
   * @param {string} comp, esse, subj
   * @returns true/false
   */
  const isExistanceSame = (comp, esse, subj) => {
    const sameData = data.filter((item) => (
      item.complete === comp && item.essential === esse && item.subject === subj
    ))
    if (sameData.length > 0) {
      return false  // 같은 과목 있음
    } else {
      return true;  // 같은 과목 없음 -> 넘겨도 됨
    }
  }


  /**
   * 체크박스 단일 선택
   */
  const onClickCheckBox = (checked, id) => {
    setIsChecked(!isChecked)
    if(checked){  
      // 체크됨
      setCheckedItems(prev => [...prev, id])
    }else{
      // 체크되지 않음 -> 배열에서 빠짐
      setCheckedItems(checkedItems.filter((el) => el !== id))
    }
  }
  console.log(checkedItems)

  /**
   * 추가 버튼 onClick
   */
  const btnAdd = () => {
    setAddTR(addTR.concat(<TR grade={grade} id='newTr' setInputCheckBox={setInputCheckBox}/>))
    setBtnDisplay(!btnDisplay)
  }

  /**
   * 저장버튼 onClick
   */
  const btnSave = () => {

    const query = `input[name='inputSubjectValue']`;
    const inputEls = document.querySelectorAll(query);

    if (inputEls.length === 0) {
      alert('추가 버튼을 눌러 요소를 추가한 후에 저장버튼을 눌러주세요.')
      return false;
    }

    const thisTable = document.getElementById(`tables${grade}`)

    // 데이터 저장
    const completeValue = document.getElementById('inputComplete').value
    const essentialValue = document.getElementById('inputEssential').value
    const subjectValue = document.getElementById('inputSubject').value
    const creditValue = document.getElementById('inputCredit').value
    const attendValue = document.getElementById('inputAttend').value

    // 이미 data에 같은 이수+필수+과목명의 과목이 있다면 입력 못하도록 막음
    if (!isExistanceSame(completeValue, essentialValue, subjectValue)) {
      alert('같은 학년 내 동일 과목은 입력할 수 없습니다.')
      return false;
    } else {
      // 1학점은 온라인강의 p/np로 계산
      // eslint-disable-next-line eqeqeq
      if (creditValue == 1) {

        if (!subjectValue) {
          alert('과목명을 입력해주세요!')
        } else {
          const saveData = {
            id: data.length,
            complete: completeValue,
            essential: essentialValue,
            subject: subjectValue,
            credit: creditValue,
            score: [attendValue, "", "", ""]
          }
          setSavedData(saveData)

          thisTable.deleteRow(1)

          // 데이터가 들어간 열 추가
          setData([...data, saveData])

          setBtnDisplay(!btnDisplay)
        }
      }
      // 2,3 학점은 학점 계산
      // eslint-disable-next-line eqeqeq
      else if (creditValue == 2 || creditValue == 3) {
        const reportValue = document.getElementById('inputReport').value
        const midValue = document.getElementById('inputMid').value
        const finValue = document.getElementById('inputFin').value

        if (!subjectValue || !attendValue || !reportValue || !midValue || !finValue) {
          alert('빈 값을 채워주세요')
        } else {
          var score = []
          score.push(attendValue)
          score.push(reportValue)
          score.push(midValue)
          score.push(finValue)

          const saveData = {
            id: data.length,
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
          setData([...data, saveData])

          setBtnDisplay(!btnDisplay)
        }
      }
    }
  }

  /**
   * 삭제버튼 onClick
   */
  const btnDelete = () => {
    if(checkedItems.length === 0 && inputCheckBox === false){   // 삭제 요소가 없을 때
      alert('삭제하고싶은 요소를 체크 후 삭제 버튼을 눌러주세요');
      return false;
    }
    else if(inputCheckBox === true){  // input체크박스가 체크 되었을 때
      const thisTable = document.getElementById(`tables${grade}`)
      thisTable.deleteRow(1)
      setBtnDisplay(!btnDisplay)
    }
    const deleteElement = checkedItems.map(item=> Number(item))
    setCheckedItems([])

    setData(data.filter(x => !deleteElement.includes(x.id)))

  }



  /**
   * 초기화 버튼 onClick
   */
  const btnReset = (grade) => {
    document.getElementById('inputSubject').value = ''
    console.log('삭제1')
    if(document.getElementById('inputCredit').value === 2 || document.getElementById('inputCredit').value === 3){
      document.getElementById('inputAttend').value = ''
      document.getElementById('inputReport').value = ''
      document.getElementById('inputMid').value = ''
      document.getElementById('inputFin').value = ''
      console.log("hi")

    }
  }


  // 컴포넌트에서 사용하는 계산
  /**
   * 합계 학점 계산
   * @returns (int)total
   */
  const totalCredit = () => {
    var total = 0
    for (var i = 0; i < data.length; i++) {
      total += parseInt(data[i].credit)
    }
    return total;
  }

  /**
   * 총점 합계(출석점수, 과제점수, 중간, 기말) 계산
   * @param {int} num 
   * @returns (int)total
   */
  const totalScore = (num) => {
    var total = 0
    for (var i = 0; i < data.length; i++) {
      if (data[i].score[0] === 'p' || data[i].score[0] === 'np' || data[i].score[num] === '') {
        total += 0;
      } else {
        total += parseInt(data[i].score[num])
      }
    }
    return total;
  }

  /**
   * 합계 성적 계산
   * @returns (int)total
   */
  const totalGrade = () => {
    var totalItem = (totalScore(0) + totalScore(1) + totalScore(2) + totalScore(3)) / totalAvg()

    if(totalScore(0) === "p"){
      return "P"
    } else if (totalScore(0) === "np"){
      return "NP"
    }
    else if (totalItem > 95) {
      return 'A+'
    } else if (totalItem >= 90) {
      return 'A0'
    } else if (totalItem >= 85) {
      return 'B+'
    } else if (totalItem >= 80) {
      return 'B0'
    } else if (totalItem >= 75) {
      return 'C+'
    } else if (totalItem >= 70) {
      return 'C0'
    } else if (totalItem >= 65) {
      return 'D+'
    } else if (totalItem >= 60) {
      return 'D0'
    } else {
      return 'F'
    }
  }

  /**
   * 1학점을 제외한 data의 배열 길이를 구하는 함수
   * @returns (num)dataLength
   */
  const totalAvg = () => {
    var credit1Length = 0;
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      // eslint-disable-next-line eqeqeq
      if (item.credit == 1) {
        credit1Length += 1;
      }
    })
    var dataLength = data.length - credit1Length;
    return dataLength;
  }

  /**
   * 1학점 총점이 NaN으로 표시되는걸 방지하기 위한 함수
   * @param {int} totalItem 
   * @returns (int)TotalScore
   */
  const rowTotalScore = (attention, report, mid, fin) => {
    const total = parseInt(attention) + parseInt(report) + parseInt(mid) + parseInt(fin);
    // eslint-disable-next-line use-isnan
    if (isNaN(total)) {
      return ""
    } else {
      return total
    }
  }


  return (
    <SlideToggle>
      {
      ({ toggle, setCollapsibleElement }) => (

        <MainWrap className={`main-wrap-${grade}`}>
          <div className="title-box">
            <div className="title-slidebtn">
              <p className={`btnSlide ${showTable ? '' : 'hide'}`} show={showTable} onClick={() => {toggle(); setShowTable(!showTable);}}>
                <ion-icon name="chevron-up-outline"></ion-icon>
              </p>
              <h2>{grade}학년</h2>
            </div>
            <div className="btn-box">
              <Btn onClick={() => btnReset(grade)} display={btnDisplay}>초기화</Btn>
              <Btn onClick={btnAdd} display={!btnDisplay}>추가</Btn>
              <Btn onClick={btnSave}>저장</Btn>
              <Btn onClick={btnDelete}>삭제</Btn>
            </div>
          </div>

          <div ref={setCollapsibleElement}>
            <Table className="table-wrap" striped id={tableID}>
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
                {addTR}
                {data.map((item) => {
                  const totalItem = parseInt(item.score[0]) + parseInt(item.score[1]) + parseInt(item.score[2]) + parseInt(item.score[3])
                  const clacGrade = (totalItem) => {
                    if (item.score[0] === '0') {  // 결석 4번은 F
                      return 'F'
                    } else if (item.score[0] === 'p') {
                      return 'P'
                    } else if (item.score[0] === 'np'){
                      return 'NP'
                    }
                    else if (totalItem >= 95) {
                      return 'A+'
                    } else if (totalItem >= 90) {
                      return 'A0'
                    } else if (totalItem >= 85) {
                      return 'B+'
                    } else if (totalItem >= 80) {
                      return 'B0'
                    } else if (totalItem >= 75) {
                      return 'C+'
                    } else if (totalItem >= 70) {
                      return 'C0'
                    } else if (totalItem >= 65) {
                      return 'D+'
                    } else if (totalItem >= 60) {
                      return 'D0'
                    } else {
                      return 'F'
                    }
                  }
                  return (
                    <tr >
                      <td><input type="checkbox" 
                        onClick={(e) => onClickCheckBox(e.target.checked, item.id)} 
                        checked={checkedItems.includes(item.id) ? true : false}   // checkedItem 배열에 있을경우 활성화, 아닐 시 해제
                        name={grade} 
                        className='check-box'/>
                      </td>

                      <td>{item.complete}</td>
                      <td>{item.essential}</td>
                      <td className="tdSubject">{item.subject}</td>
                      <td>{item.credit}</td>
                      <td>{item.score[0] === 'p' || item.score[0] === 'np' ? "" : item.score[0]}</td>
                      <td>{item.score[1]}</td>
                      <td>{item.score[2]}</td>
                      <td>{item.score[3]}</td>
                      <td>{rowTotalScore(item.score[0], item.score[1], item.score[2], item.score[3])}</td>
                      <td></td>
                      <td style={{ color: clacGrade(totalItem) === 'F' ? 'red' : 'var(--gray900)' }}>{clacGrade(totalItem)}</td>
                    </tr>
                  )
                })
                }
                <ResultTr>
                  <td colSpan='4'>합계</td>
                  <td>{totalCredit()}</td>
                  <td>
                    {totalScore(0)}
                  </td>
                  <td>{totalScore(1)}</td>
                  <td>{totalScore(2)}</td>
                  <td>{totalScore(3)}</td>
                  <td>{totalScore(0) + totalScore(1) + totalScore(2) + totalScore(3)}</td>
                  <td>{((totalScore(0) + totalScore(1) + totalScore(2) + totalScore(3)) / totalAvg()).toFixed(2)}</td>
                  <td>{totalGrade()}</td>
                </ResultTr>
              </Tbody>
            </Table>
          </div>


        </MainWrap>
      )}
    </SlideToggle>
  )
}
export default Tables;


// styled component
// css
const MainWrap = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  margin-bottom: 30px;
  .title-box{
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    align-items: center;
    background-color: var(--gray400);
    height: 40px;

    .title-slidebtn{
      display: flex;
      align-items: center;


      >p{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 16px;
        transform: rotate(0deg);
        transition: .2s;

        ion-icon{
          font-size: 25px;
        }
      }

      >.btnSlide.hide{
        transform: rotate(180deg);
      }

      h2{
      font-size: 22px;
      line-height: 40px;
      box-sizing: border-box;
      transform: translate(10px,4px);
    }
    }
  }
`
const Btn = styled.button`
  display: ${props => props.display === true ? 'none' : 'inline-block'};
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