import styled from 'styled-components';

const UserForm = styled.form`
background-color: ${(props) => props.theme.colors.main};
display: flex;
flex-direction: column;
max-width: 700px;
border-radius: 5px;
padding-left: 2.5rem;
padding-right: 2.5rem;
margin-left: auto;
margin-right: auto;
margin-bottom: 2.5rem;
`;

export default UserForm;
