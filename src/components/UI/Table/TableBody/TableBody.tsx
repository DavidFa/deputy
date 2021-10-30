import React from 'react';
import styled from 'styled-components';

const StyledTableBody = styled.tbody`
`;

const TableBody: React.FC = (props) => {

  return (<StyledTableBody>{props.children}</StyledTableBody>)
}

export default TableBody;