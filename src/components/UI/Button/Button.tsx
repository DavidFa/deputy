import React from 'react';
import styled from "styled-components";

interface StyledButtonProps {
    readonly hasBorder?: boolean;
    readonly bold?: boolean;
    readonly disabled?: boolean;
    readonly background?: string;
    readonly color?: string;
    readonly padding?: string;
    onClick: () => void;
}
const StyledButton = styled.button.attrs<{ disabled: boolean }>(
    props => ({
        disabled: props.disabled
    })
) <StyledButtonProps>`
padding: ${props => props.padding ?  props.padding : "0.3rem 1rem"};
margin: 0 0.3rem;
border:${props => props.hasBorder ? "1px solid #ccc" : "0"};
background-color: ${props => props.background ? props.background : "transparent"};
color: ${props => props.color ? props.color : "#000"};
border-radius: 0.3rem;
font-weight: ${props => props.bold ? "bold" : "normal"};
font-size: ${props => props.bold ? "120%" : "100%"};
cursor: pointer;
`;

interface ButtonProps {
    hasBorder?: boolean;
    bold?: boolean;
    disabled?: boolean;
    background?: string;
    color?: string;
    padding?: string;
    onClick: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
    const { children, onClick, ...rest } = props;
    return (
        <StyledButton {...rest} onClick={onClick}>{children}</StyledButton>
    )
}

export default Button;
