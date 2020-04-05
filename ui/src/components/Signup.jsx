import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import api from '../api';

const StyledForm = styled.form`
background-color: ${(props) => props.theme.colors.main};
display: flex;
flex-direction: column;
padding-left: 2.5rem;
padding-right: 2.5rem;
`;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '', lastName: '', email: '', password: '', passwordConf: '', location: '',
    };
  }

  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  }

  handlePasswordConfChange = (event) => {
    this.setState({ passwordConf: event.target.value });
  }

  handleSubmit = (event) => {
    api.post('/signup', {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      location: this.state.location,
    }).then((response) =>{


    }).catch((error) => {

    });
    event.preventDefault();
  }


  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <label for='signupFirstname'>First Name</label>
        <input type='text' id='singupFirstname' value={this.state.firstName} onChange={this.handleFirstNameChange} />
        <label for='signupLastname'>Last Name</label>
        <input type='text' id='signupLastname' value={this.state.lastName} onChange={this.handleLastNameChange} />
        <label for='signupLocation'>Location</label>
        <input type='text' id='signupLocation' value={this.state.location} onChange={this.handleLocationChange} />
        <label for='signupEmail'>Email</label>
        <input type='email' id='signupEmail' value={this.state.email} onChange={this.handleEmailChange} />
        <label for='signupPassword'>Password</label>
        <input type='password' id='signupPassword' value={this.state.password} onChange={this.handlePasswordChange} />
        <label for='signupPasswordConf'>Confirm Password</label>
        <input type='password' id='signupPasswordConf' value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
        <input type="submit" />
      </StyledForm>
    )
  }


}

export default Signup;