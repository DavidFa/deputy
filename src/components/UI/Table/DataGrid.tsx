import React from 'react';
import styled from "styled-components";
import TableContrainer from './TableContainer/TableContainer';
import Table from './Table/Table';
import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import TableCell from './TableCell/TableCell';
import TableBody from './TableBody/TableBody';
import TablePagination from "./TablePagination/TablePagination"
import { useState } from 'react';
import { DataGridProps } from '../../../models/Types';
import Button from '../Button/Button';

const DataGridDiv = styled.div`
    width:90%;
    outline: 0px;
    margin: 0.3rem 0;
    float:left;
    overflow: auto;
    padding: 12px;
    background-color: #eee;
    box-shadow: 0 4px 4px 4px  #ccc;
    border-radius: 4px;
    border: 1px solid #ddd;

    /* ipad pro */
    @media screen and (max-width: 1024px) {
        float: none;
        width: 100%;
        margin: 0.3rem 0;
    }

    /* ipad */
    @media screen and (max-width: 768px) {
        float: none;
        width: 100%;
        margin: 0.3rem 0;
    }
    `;

// React.memo to prevent unnecessery re-render
const DataGrid: React.FC<DataGridProps> = React.memo(({ rows, columns, rowsPerPage = 10, onViewClickHandler }) => {

    const defaultPage = 1;
    const [page, setPage] = useState<number>(defaultPage);

    const onPageChangeHandler = (page: number) => {
        setPage(page);
    }

    return <DataGridDiv data-testid="dataGrid">
        <TableContrainer>
            <Table>
                <TableHead columns={columns} />
                <TableBody>
                    {!rows.length ?
                        <TableRow>
                            <TableCell borderBottom={true} colSpan={columns.length} textAlign={"center"}>Data is empty!</TableCell>
                        </TableRow>
                        : rows.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row, index) => {
                            return (
                                <TableRow key={`TableRow_${index}`}>
                                    {columns.map((column, i) => {
                                        if (row[column.field]) {
                                            return <TableCell key={`TableCell_${i}`} borderBottom={true} textAlign={column.align}>{row[column.field]}</TableCell>
                                        }
                                        return null;
                                    })}
                                    <TableCell key={`TableCell_button_view`} borderBottom={true} textAlign="right">
                                        <Button disabled={false} onClick={() => onViewClickHandler(row["id"])} hasBorder={true}>View</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
                <TablePagination
                    colSpan={columns.length}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChangeHandler={onPageChangeHandler}
                />
            </Table>
        </TableContrainer>
    </DataGridDiv>
})

export default DataGrid;