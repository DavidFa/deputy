import React from 'react'
import styled from 'styled-components';
import { DropdownOptionType } from '../../../models/Types';

const Select = styled.select`
width: 20%;
padding: 0.3rem 0.6rem;
margin: 0.3rem 2rem;
border-radius: 0.3rem;
border: 1px solid #999;
font-size: 1rem;
float:left;

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
`
interface DropdownProps {
    value: string;
    options?: DropdownOptionType<string, string>[];
    onChangeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
}

// Preventing unnecessery re-render by using React.memo
const Dropdown: React.FC<DropdownProps> = React.memo(({ value, options, onChangeHandler }) => {
    return (
        <Select onChange={onChangeHandler} value={value} data-testid="dropdown" >
            <option key="defaultKey" value="">Filter</option>
            {options?.map((item, index) => <option key={`${index}_${item.value}`} value={item.value}>{item.item}</option>)}
        </Select>
    )
})

export default Dropdown;
