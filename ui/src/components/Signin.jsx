import React from 'react';
import api, {setToken} from '../api';
import styled from 'styled-components';
import UserContext from '../UserContext';
import { withRouter } from 'react-router-dom';


const StyledContainer = styled.div`
display: flex;
justify-content :center;
align-items: center;
height: 60%;
`;
const StyledForm = styled.form`
background-color: ${(props) => (props.theme.colors.main)};
max-width: 300px;
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
    this.state = ({ email: '', password: '' });
  }

  handleSubmit = (event) => {
    api.post('/signin', {
      username: this.state.email,
      password: this.state.password,
    }).then((response) => {
      console.log('response in signin', response);
      this.context.setUser(response.data);
      setToken(response.data.token);
      if (response.data.isPatient) {
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
      <StyledContainer>
        <StyledForm onSubmit={this.handleSubmit} >
          <StyledDiv>
            <label htmlFor='loginEmail'>User Name(email)</label>
            <input id='loginEmail' type='text' value={this.state.email} onChange={this.handleEmailChange} />
          </StyledDiv>
          <StyledDiv>
            <label htmlFor='loginPassword'>password</label>
            <input id='loginPassword' type='password' value={this.state.password} onChange={this.handlePasswordChange} />
          </StyledDiv>
          <input type="submit" value="Login" />
        </StyledForm>
      </StyledContainer>
    );
  }
}

Signin.contextType = UserContext;
export default withRouter(Signin);
