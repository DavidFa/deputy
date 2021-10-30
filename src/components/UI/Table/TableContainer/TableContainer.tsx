import React from "react";
import styled from "styled-components";

const Container = styled.div`
width:100%;
`

const TableContainer: React.FC = (props) => {

    return <Container>{props.children}</Container>

}

export default TableContainer;