import React, {useState} from "react";
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

  const dataChange = (e) => {
    // const {name, value} = e.target
    setInputData({
      ...inputData,
      [e.target.name]:e.target.value
    })
  }

  // 학점 입력 제한
  $(document).on('keyup', '.write_number_credit',function() {
    var val= $(this).val();

    if(val.replace(/[0-9]/g, "").length > 0) {
        alert("숫자만 입력해 주십시오.");
        $(this).val('');
    }

    if(val < 1 || val >= 4) {
        alert("1~3학점 사이로 입력해 주십시오.");
        $(this).val('');
    }
  })
  
  // 출석 입력 제한
  $(document).on('keyup', '.write_number_attend',function() {
    var val= $(this).val();

    if(val.replace(/[0-9]/g, "").length > 0) {
        alert("숫자만 입력해 주십시오.");
        $(this).val('');
    }

    if(val < 0 || val > 20) {
        alert("0~10점 사이로 입력해 주십시오.");
        $(this).val('');
    }
  })

  // 과제 점수 입력 제한
    // 출석 입력 제한
    $(document).on('keyup', '.write_number_report',function() {
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
  $(document).on('keyup', '.write_number_test',function() {
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
      <td>
        <input type='text' id='inputSubject' name='inputSubjectValue' value={inputSubjectValue} onChange={dataChange}></input>
      </td>
      <td>
        <input type='text' className="write_number_credit" id='inputCredit' name='inputCreditValue' value={inputCreditValue} onChange={dataChange}/>
      </td>
      <td>
        <input type='text' className="write_number_attend" id='inputAttend' name='inputAttendValue' value={inputAttendValue} onChange={dataChange}/>
      </td>
      <td>
        <input type='text' className="write_number_report" id='inputReport' name='inputReportValue' value={inputReportValue} onChange={dataChange}/>
      </td>
      <td>
        <input type='text' className="write_number_test" id='inputMid' name='inputMidValue' value={inputMidValue} onChange={dataChange}/>
      </td>
      <td>
        <input type='text' className="write_number_test" id='inputFin' name='inputFinValue' value={inputFinValue}  onChange={dataChange}/>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  )
}
export default InputTr;