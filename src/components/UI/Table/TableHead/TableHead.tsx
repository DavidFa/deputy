import React from 'react';
import styled from 'styled-components';
import { DataGridColumns } from '../../../../models/Types';
import TableCell from '../TableCell/TableCell';
import TableRow from '../TableRow/TableRow';

const StyledTableHead = styled.thead`
display: table-header-group;
vertical-align: middle;
border-color: inherit;
`;

const TableHead: React.FC<{ columns: DataGridColumns[] }> = ({ columns }) => {

  return (<StyledTableHead>
    <TableRow>
      {columns?.map(column => {
        return <TableCell key={column.field} textAlign={column.align} borderBottom={true} sortable={column.sortable}>{column.headerName}</TableCell>
      })}
    </TableRow>
  </StyledTableHead>)
}

export default TableHead;