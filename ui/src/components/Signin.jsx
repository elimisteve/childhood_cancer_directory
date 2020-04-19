import React from 'react';
import api, {setToken} from '../api';
import styled from 'styled-components';
import UserContext from '../UserContext';
import { withRouter } from 'react-router-dom';
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ email: '', password: '' });
  }

  handleSubmit = (event) => {
    api.post('/signin', {
      username: this.state.email,
      password: this.state.password,
    }).then((response) => {
      this.context.setUser(response.data.user);
      setToken(response.data.user.token);
      if (response.data.user.isPatient) {
        this.props.history.push('/volunteers');
      }
      else {
        this.props.history.push('/patients');
      }
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
        <input id='loginEmail' type='text' value={this.state.email} onChange={this.handleEmailChange} />
        <label for='loginPassword'>User Name</label>
        <input id='loginPassword' type='password' value={this.state.password} onChange={this.handlePasswordChange} />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

Signin.contextType = UserContext;
export default withRouter(Signin);
