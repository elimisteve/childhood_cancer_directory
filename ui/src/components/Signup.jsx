import React from 'react';
import styled from 'styled-components';
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
      name: '', username: '', password: '', passwordConf: '', location: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }


  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }


  handlePasswordConfChange = (event) => {
    this.setState({ passwordConf: event.target.value });
  }

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  }

  handleSubmit = (event) => {
    api.post('/signup', {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      location: this.state.location,
    }).then((response) =>{
      console.log('RESPONSE', response);
      sessionStorage.setItem('token', response.data.token);
    }).catch((error) => {
    });
    event.preventDefault();
  }


  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <label htmlFor='signupName'>Name</label>
        <input type='text' id='signupName' value={this.state.lastName} onChange={this.handleNameChange} />
        <label htmlFor='signupLocation'>Location</label>
        <input type='text' id='signupLocation' value={this.state.location} onChange={this.handleLocationChange} />
        <label htmlFor='signupUsername'>Email</label>
        <input type='email' id='signupUsername' value={this.state.username} onChange={this.handleUsernameChange} />
        <label htmlFor='signupPassword'>Password</label>
        <input type='password' id='signupPassword' value={this.state.password} onChange={this.handlePasswordChange} />
        <label htmlFor='signupPasswordConf'>Confirm Password</label>
        <input type='password' id='signupPasswordConf' value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
        <input type="submit" />
      </StyledForm>
    );
  }


}

export default Signup;