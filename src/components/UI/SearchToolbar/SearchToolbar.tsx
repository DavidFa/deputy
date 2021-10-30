import React from 'react';
import styled from 'styled-components';

// interface SearchBarProps {
//     readonly placeHolder: string;
// }
const SearchBar = styled.input`
width: 30%;
padding: 0.3rem 0.6rem;
margin: 0.3rem 0;
border-radius: 0.3rem;
border: 1px solid #999;
font-size: 1rem;
float:left;

/* ipad pro */
@media screen and (max-width: 1024px) {
    float: none;
    width: 100%;
}

/* ipad */
@media screen and (max-width: 768px) {
    float: none;
    width: 100%;
}
`
interface SearchToolBarProps {
    value: string;
    placeholder?: string;
    onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}

const SearchToolBar: React.FC<SearchToolBarProps> = React.memo(({ value, placeholder = "", onChangeHandler }) => {
    return (
        <SearchBar data-testid="searchToolBar" placeholder={placeholder} onChange={onChangeHandler} value={value} />
    )
})

export default SearchToolBar;
