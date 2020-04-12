import React from 'react';
import styled from 'styled-components';
import api from '../api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ email: '', password: '' });
  }

  handleSubmit = (event) => {
    api.post('/signin', {
      username: this.state.email,
      password: this.state.password,
    }).then((response) => {
      console.log('login respoine', response);
      sessionStorage.setItem('token',  response.data.token);
    });
    event.preventDefault();
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <label htmlFor='loginEmail'>User Name</label>
        <input id='loginEmail' type='text' value={this.state.email} onChange={this.handleEmailChange}/>
        <label for='loginPassword'>User Name</label>
        <input id='loginPassword' type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
        <input type="submit" value="Login"/>
      </form>
    )
  }
}

export default Login;