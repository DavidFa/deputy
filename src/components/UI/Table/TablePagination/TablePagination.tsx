import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableRow from "../TableRow/TableRow";
import TableCell from "../TableCell/TableCell";
import Button from "../../Button/Button";

type TablePaginationType = {
    colSpan: number;
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChangeHandler: (page: number) => void;
}

const TableFoot = styled.tfoot`
`;

const Wrapper = styled.div`
text-align: right;
padding-right: 30px;
`;

const TablePagination: React.FC<TablePaginationType> = ({ colSpan, count, rowsPerPage, page, onPageChangeHandler }) => {

    const [totalPage, setTotalPage] = useState<number>(100);
    const [pages, setPages] = useState<JSX.Element[]>([]);

    useEffect(() => {
        let pageSize = Math.floor(count / rowsPerPage);
        pageSize += count % rowsPerPage > 0 ? 1 : 0;
        setTotalPage(pageSize);
    }, [count, rowsPerPage]);

    useEffect(() => {
        const pageButtons: JSX.Element[] = [];

        let startPage = 1;
        let endPage = totalPage;
        let needPrevPages = false;
        let needNextPages = false;
        if (totalPage > 10) {
            if (page <= 5) {
                startPage = 1;
                endPage = startPage + 10;
                needNextPages = true;
            } else if (page >= totalPage - 5) {
                startPage = totalPage - 10;
                endPage = totalPage;
                needPrevPages = true;
            } else if (page > 5 && page < totalPage - 5) {
                startPage = page - 5;
                endPage = startPage + 10;
                needNextPages = true;
                needPrevPages = true;
            }
        }
        if (needPrevPages)
            pageButtons.push(<Button key={startPage - 1} onClick={() => onPageChangeHandler(startPage - 1)} bold={true} padding="0.3rem 0.3rem">...</Button>)

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(<Button key={i} onClick={() => onPageChangeHandler(i)} bold={i === page} padding="0.3rem 0.3rem">{i}</Button>)
        }

        if (needNextPages)
            pageButtons.push(<Button key={endPage + 1} onClick={() => onPageChangeHandler(endPage + 1)} bold={true} padding="0.3rem 0.3rem">...</Button>)

        setPages(pageButtons);
    }, [page, totalPage, onPageChangeHandler]);

    return (
        <TableFoot>
            <TableRow>
                <TableCell textAlign={'left'}>
                    <Button disabled={page <= 1} onClick={() => onPageChangeHandler(page - 1)} hasBorder={true} >Previous Page</Button>
                </TableCell>
                <TableCell colSpan={colSpan - 2}>
                    <Wrapper>
                        {pages}
                    </Wrapper>
                </TableCell>
                <TableCell>
                    <Button disabled={page >= totalPage} onClick={() => onPageChangeHandler(page + 1)} hasBorder={true}>Next Page</Button>
                </TableCell>
            </TableRow>
        </TableFoot>
    )
}

export default TablePagination;