import React from 'react';
import styled from 'styled-components';
import api from '../api';

const StyledForm = styled.form`
background-color: ${(props) => props.theme.colors.main};
display: flex;
flex-direction: column;
margin: 5px;
`

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {firstName: '', lastName: '', email: '', password: '', location: ''}
  }

  handleFirstNameChange = (event) => {
    this.setState({firstName: event.target.value})
  }
  handleLastNameChange = (event) => {
    this.setState({lastName: event.target.value})
  }
  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  handleLocationChange = (event) => {
    this.setState({location: event.target.value})
  }


  render() {
    return(
      <StyledForm>
        <label for='signupFirstname'>First Name</label>
        <input type='text' id='singupFirstname' value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        <label for='signupLastname'>Last Name</label>
        <input type='text' id='signupLastname' value={this.state.lastName} onChange={this.handleLastNameChange}/>
        <label for='signupLocation'>Location</label>
        <input type='text' id='signupLocation' value={this.state.location} onChange={this.handleLocationChange}/>
        <label for='signupEmail'>Email</label>
        <input type='email' id='signupEmail' value={this.state.email} onChange={this.handleEmailChange}/>
        <label for='signupPassword'>Password</label>
        <input type='password' id='signupPassword' value={this.state.password} onChange={this.handlePasswordChange}/>
      </StyledForm>
    )
  }


}

export default Signup;