import React from 'react';
import defaultAvator from '../../avatar.jpg';
import styled from 'styled-components';
import { PeopleEditKeyType, PeopleType } from '../../models/Types';
import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';

const Wrapper = styled.div`
width:100%;
position: fixed;
margin: 10rem auto;

/* ipad pro */
@media screen and (max-width: 1024px) {
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
}

/* ipad */
@media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
}

/* ipad */
@media screen and (max-width: 480px) {
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
}
`;

const Modal = styled.div`
box-sizing: border-box;
position: relative;
z-index: 200;
background-color:#fff;
border-radius:6px;
margin: 30px auto;
width: 400px;
height: 400px;

/* ipad pro */
@media screen and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

/* ipad */
@media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
`;

const ModalHeader = styled.div`
box-sizing: border-box;
position: relative;
display: block;
width:100%;
height:10%;
margin: 0;
background-color: #ddd;
border-bottom:1px solid #bbb;
`;

const ModalTitle = styled.h3`
box-sizing: border-box;
width:100%;
height:100%;
text-align:left;
justify-content: center;
padding: 0.5rem 2rem;
margin: 0;
`
const ModalContent = styled.div`
box-sizing: border-box;
display:flex;
flex-direction:row;
width:100%;
height:90%;
`

const ModalContentLeft = styled.div`
box-sizing: border-box;
width:30%;
height:100%;
background-color: #ddd;
`

const ModalContentRight = styled.div`
box-sizing: border-box;
width:70%;
height:100%;
padding: 0 2rem;
`

const Form = styled.form`
box-sizing: border-box;
display: block;
width:100%;
height:100%;
`

const FormInputGroup = styled.div`
box-sizing: border-box;
display: block;
`

const FormImg = styled.img`
box-sizing: border-box;
display: block;
border-radius: 50%;
margin: 1rem auto;
`

interface FormLabelProps {
    readonly fontSize?: string;
    readonly textAlign?: string;
    readonly margin?: string;
    readonly padding?: string;
    readonly backgroundColor?: string;
}
const FormLabel = styled.label<FormLabelProps>`
font-size:${props => props.fontSize ? props.fontSize : "16px"};
box-sizing: border-box;
display: block;
text-align: ${props => props.textAlign ? props.textAlign : "left"};
padding: ${props => props.padding ? props.padding : "0.5rem"};;
margin: ${props => props.margin ? props.margin : "0.2rem 0.2rem"};
background-color:  ${props => props.backgroundColor ? props.backgroundColor : "inherit"};
`

const FormInput = styled.input`
box-sizing: border-box;
display: block;
padding: 0.1rem;
`

const FormFooter = styled.div`
box-sizing: border-box;
display: block;
padding: 0.3rem;
text-align: right;
`

type PersonEditProp = {
    person: PeopleType;
    onChange: (event: React.FormEvent<HTMLInputElement>, key: PeopleEditKeyType) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PersonEdit: React.FC<PersonEditProp> = ({ person, onChange, onSubmit }) => {

    return (
        <Wrapper>
            <Backdrop show={true} />

            <Modal>
                <ModalHeader>
                    <ModalTitle>Employee</ModalTitle>
                </ModalHeader>
                <ModalContent>
                    <ModalContentLeft>
                        <FormInputGroup><FormImg src={person.avatarUrl ? person.avatarUrl : defaultAvator} alt="Avatar" width="80" height="80" /></FormInputGroup>
                        <FormInputGroup><FormLabel fontSize="20px;" textAlign="center" margin="0" padding="0">{person.name}</FormLabel></FormInputGroup>
                        <FormInputGroup><FormLabel fontSize="12px;" textAlign="center" margin="0" padding="0">{person.status}</FormLabel></FormInputGroup>
                        <FormInputGroup><FormLabel margin="0.5rem 0 0.2rem 0.5rem" backgroundColor="#fff">Details</FormLabel></FormInputGroup>
                    </ModalContentLeft>
                    <ModalContentRight>
                        <Form onSubmit={onSubmit}>
                            <FormInputGroup><FormLabel>Address</FormLabel><FormInput value={person.address} onChange={(e) => onChange(e, "address")}></FormInput></FormInputGroup>
                            <FormInputGroup><FormLabel>Email</FormLabel><FormInput value={person.email} onChange={(e) => onChange(e, "email")}></FormInput></FormInputGroup>
                            <FormInputGroup><FormLabel>Location</FormLabel><FormInput value={person.location} onChange={(e) => onChange(e, "location")}></FormInput></FormInputGroup>
                            <FormInputGroup><FormLabel>Date of Birth</FormLabel><FormInput value={person.dob} onChange={(e) => onChange(e, "dob")}></FormInput></FormInputGroup>
                            <FormFooter><Button disabled={false} onClick={() => { }} hasBorder={true} background="#0288D1" color="#FFF">Save</Button></FormFooter>
                        </Form>
                    </ModalContentRight>
                </ModalContent>
            </Modal>
        </Wrapper>
    )
}

export default PersonEdit;
