import React from 'react';
import api, { setToken } from '../api';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import UserContext from '../UserContext';
import { withRouter } from 'react-router-dom';
import ErrorBox from './ErrorBox.jsx';
import Loader from './Loader.jsx';
import AboutText from './AboutText.jsx';


const StyledContainer = styled.div`
display: flex;
flex-direction: column;
height: 60%;
`;
const StyledForm = styled.form`
background-color: ${(props) => (props.theme.colors.main)};
max-width: 400px;
margin: auto;
display: flex;
flex-direction: column;
padding: 2%;
border-raduius: 5px;
`;
const StyledDiv = styled.div`
padding: 7px;
display: flex;
flex-direction: column;
& > * {
  padding:5px;
}
`;
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      email: '', password: '', error: null, loading: false, rememberMe: false,
    });
  }

  handleSubmit = (event) => {
    this.setState({ loading: true });
    api.post('/signin', {
      username: this.state.email,
      password: this.state.password,
    }).then((response) => {
      const user = jwt.decode(response.data);
      this.context.setUser(user);
      setToken(response.data);
      if (this.state.rememberMe) {
        localStorage.setItem('token', response.data);
      }
      if (user.isPatient) {
        this.props.history.push('/volunteers');
      }
      else {
        this.props.history.push('/patients');
      }
    }).catch((error) => {
      console.log('in catch', error);
      this.setState({ error: error.response.data, loading: false });
    });
    event.preventDefault();
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleRememberMeChange = (event) => {
    this.setState({ rememberMe: event.target.checked });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <>
        <AboutText />
        <StyledContainer>
          {this.state.error && <ErrorBox message={this.state.error} />}
          <StyledForm onSubmit={this.handleSubmit} >
            <StyledDiv>
              <label htmlFor='loginEmail'>User Name(email)</label>
              <input id='loginEmail' type='text' required={true} value={this.state.email} onChange={this.handleEmailChange} />
            </StyledDiv>
            <StyledDiv>
              <label htmlFor='loginPassword'>password</label>
              <input id='loginPassword' type='password' required={true} value={this.state.password} onChange={this.handlePasswordChange} />
            </StyledDiv>
            <StyledDiv>
              <span>
                <label htmlFor='loginRememberMe'>Remember me</label>
                <input id='loginRememberMe' type='checkbox' checked={this.state.rememberMe} onChange={this.handleRememberMeChange} />
              </span>
            </StyledDiv>
            <input type="submit" value="Login" />
          </StyledForm>
        </StyledContainer>
      </>
    );
  }
}

Signin.contextType = UserContext;
export default withRouter(Signin);
