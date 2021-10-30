import React from 'react';
import styled from 'styled-components';

const StyledTableRow = styled.tr`
color: inherit;
display: table-row;
vertical-align: middle;
outline: 0px;
`;

const TableRow: React.FC = (props) => {

    return (<StyledTableRow>{props.children}</StyledTableRow>)
}

export default TableRow;