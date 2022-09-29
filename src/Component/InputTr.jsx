import React, {useState} from "react";
// import styled from "styled-components";
import $ from 'jquery';


const InputTr = (props) => {
  const grade = props.grade;
  const [inputData, setInputData] = useState({
    inputCompleteValue: '',
    inputEssentialValue: '',
    inputSubjectValue: '',
    inputCreditValue: '',
    inputAttendValue: '',
    inputReportValue: '',
    inputMidValue: '',
    inputFinValue: ''
  })


  const { inputCompleteValue, inputEssentialValue,
    inputSubjectValue, inputCreditValue,
    inputAttendValue, inputReportValue,
    inputMidValue, inputFinValue } = inputData;

  const [display, setDisplay] = useState(true); // 학점에 따른 패논패 보이는 state 관리
  
  const CreditChange = (e) => {
    const creditValue = e.target.value;
    // eslint-disable-next-line eqeqeq
    if(creditValue == 1){
      setDisplay(true)
    }else{
      setDisplay(false)
    }
  }


  const dataChange = (e) => {
    // const {name, value} = e.target
    setInputData({
      ...inputData,
      [e.target.name]:e.target.value
    })
  }


  // 과제 점수 입력 제한
  // 출석 입력 제한
  $(document).on('keyup', '.write_number_20',function() {
    var val= $(this).val();

    if(val.replace(/[0-9]/g, "").length > 0) {
        alert("숫자만 입력해 주십시오.");
        $(this).val('');
    }
    if(val < 0 || val > 20) {
        alert("0~20점 사이로 입력해 주십시오.");
        $(this).val('');
    }
  })

  // 시험점수 입력 제한
  $(document).on('keyup', '.write_number_30',function() {
    var val= $(this).val();
  
    if(val.replace(/[0-9]/g, "").length > 0) {
        alert("숫자만 입력해 주십시오.");
        $(this).val('');
    }
    if(val < 0 || val > 30) {
        alert("0~30점 사이로 입력해 주십시오.");
        $(this).val('');
    }
  })


  return(
    <tr className="input-box">
      <td><input type="checkbox" name={grade}/></td>
      <td>
        <select name='inputCompleteValue' id='inputComplete' value={inputCompleteValue} onChange={dataChange}>
          <option value='전공' key='전공'>전공</option>
          <option value='교양' key='교양'>교양</option>
        </select>
      </td>
      <td>
        <select name='inputEssentialValue' id='inputEssential' vlaue={inputEssentialValue} onChange={dataChange}>
          <option value='선택' key='선택'>선택</option>
          <option value='필수' key='필수'>필수</option>
        </select>
      </td>
      <td display='true'>
        <input type='text' id='inputSubject' name='inputSubjectValue' value={inputSubjectValue} onChange={dataChange}></input>
      </td>
      <td>
        <select name='inputCreditValue' id='inputCredit' vlaue={inputCreditValue} onChange={(e) => {dataChange(e); CreditChange(e);}}>
          <option value='1' key='1'>1</option>
          <option value='2' key='2'>2</option>
          <option value='3' key='3'>3</option>
        </select>
      </td>
      <td style={{width: '100px'}}>
        {
          !display && <input display={display} type='text' className="write_number_20 display-none" id='inputAttend' name='inputAttendValue' value={inputAttendValue} onChange={dataChange}/>
        }
        {
          display && <select display={!display} className='display-none' name="inputAttendValue" id="inputAttend" value={inputAttendValue} onChange={dataChange} style={{width: '100%'}}>
          <option value='p' key='p'>p</option>
          <option value='np' key='np'>np</option>
        </select>
        }
        
      </td>
      <td style={{width: '100px'}}>
        {
          !display && <input type='text' display={display} className="write_number_20 display-none" id='inputReport' name='inputReportValue' value={inputReportValue} onChange={dataChange}/>
        }
      </td>
      <td style={{width: '100px'}}>
        {
          !display && <input type='text' display={display} className="write_number_30 display-none" id='inputMid' name='inputMidValue' value={inputMidValue} onChange={dataChange}/>
        }
      </td>
      <td style={{width: '100px'}}>
        {
          !display && <input type='text' display={display} className="write_number_30 display-none" id='inputFin' name='inputFinValue' value={inputFinValue}  onChange={dataChange}/>
        }
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  )
}
export default InputTr;
