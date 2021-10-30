import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
display: table;
width: 100%;
height: 60%;
background: white;
border-color: grey;
border-radius: 10px;
border: 1px solid #ddd;
border-collapse: collapse;

/* ipad pro */
@media screen and (max-width: 1024px) {
    width: 100%;
}

/* ipad */
@media screen and (max-width: 768px) {
    width: 100%;
}
`;

const Table: React.FC = (props) => {

  return (<StyledTable>{props.children}</StyledTable>)
}

export default Table;