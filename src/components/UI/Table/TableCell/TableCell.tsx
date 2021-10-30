import React from "react";
import styled from "styled-components";

type TableCellType = {
    width?: number;
    color?: string;
    background?: string;
    borderBottom?: boolean;
    colSpan?: number;
    textAlign?: string;
    sortable?: boolean;
}

interface CellAttrProps {
    readonly colSpan: number;
}

interface CellProps {
    readonly color?: string;
    readonly background?: string;
    readonly borderBottom?: boolean;
    readonly textAlign?: string;
}

const Cell = styled.td.attrs<CellAttrProps>(props => ({
    colSpan: props.colSpan
})) <CellProps>`
    width:8.3%;
    height:10%; 
    overflow:hidden;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.5rem;
    letter-spacing: 0em;
    display: table-cell;
    vertical-align: inherit;
    left: 0;
    border-bottom: ${props => props.borderBottom ? "1px solid rgb(224, 224, 224)" : ""};
    text-align:${props => props.textAlign ? props.textAlign : "right"};
    padding: 12px 24px;
    background: ${props => props.background ? props.background : "#fff"};
    color: ${props => props.color ? props.color : "rgba(0, 0, 0, 0.87)"};
`;


const TableCell: React.FC<TableCellType> = (props) => {
    const { children, ...rest } = props;
    return <Cell {...rest}>{props.children}</Cell>
}

export default TableCell;