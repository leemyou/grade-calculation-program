import React from "react";
import style from 'styled-components'

const Table = (props) => {

    console.log(props)

    // const grade = props.grade;
    // const data = props.data;

    return(
        <MainWrap>
            <Table>

            </Table>
        </MainWrap>
    )
}
export default Table;

const MainWrap = style.div`
    margin: 0 auto;
    width: 80%;
    height: 100px;
    background-color: red;
`