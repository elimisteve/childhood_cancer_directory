import React from 'react';
import styled from 'styled-components';
import HelpPicker from './HelpPicker.jsx';
import api from '../api';
import UserContext from '../UserContext';

const StyledForm = styled.form`
background-color: ${(props) => props.theme.colors.main};
display: flex;
flex-direction: column;
max-width: 700px;
border-radius: 5px;
padding-left: 2.5rem;
padding-right: 2.5rem;
margin-left: auto;
margin-right: auto;
`;

const InputElementContainer = styled.div`
padding: 20px;
border-bottom: 2px solid grey;
`;

class Signup extends React.Component {
  constructor(props) {
    console.log('PROPS IN SINUP', props);
    super(props);
    this.state = {
      isPatient: true,
      name: '',
      username: '',
      description: '',
      password: '',
      passwordConf: '',
      location: '',
      helpTypes: [],
      loading: true,
      helpType1: false,
      helpType2: false,
      helpType3: false,
      helpType4: false,
      helpType5: false,
      helpType6: false,
      helpType7: false,
      helpType8: false,
    };
  }

  componentDidMount() {
    console.log('context', this.context);
    api.get('/helpTypes').then((res) => {
      res.data.forEach((element) => { element.checked = false; });
      this.setState({ helpTypes: res.data, loading: false });
    }).catch((err) => {
      console.log(err);
      //TODO error handling;
    });
  }

  handlePatientChange = () => {
    this.setState({ isPatient: !this.state.isPatient });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  handleHelpChange = (event) => {
    const nextHelpArr = this.state.helpTypes.map((elem) => {
      if (elem.name === event.target.name) {
        elem.checked = event.target.checked;
      }
      return elem;
    });
    this.setState({ [event.target.id]: event.target.checked, helpTypes: nextHelpArr });
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
    event.preventDefault();
    if (this.state.password !== this.state.passwordConf) {
      alert('Passwords do not match');
      return;
    }
    const helpTypeIds = [];
    this.state.helpTypes.forEach((elem) => {
      if (elem.checked) {
        helpTypeIds.push(elem.id);
      }
    });
    api.post('/signup', {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      location: this.state.location,
      description: this.state.description,
      patient: this.state.isPatient,
      helpTypeIds,
    }).then((response) => {
      console.log('RESPONSE', response);
      this.context.updateUser(response.data.user);
      sessionStorage.setItem('token', response.data.token);
      console.log('NEXT CONTEXT', this.context);
    }).catch((error) => {
    });
  }


  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <InputElementContainer>
          <h2>Are you a Patient or Volunteer?</h2>
          <label htmlFor="signupPatient">Patient</label>
          <input id="signupPatient" value="patient" name="signupRadio" type="radio" checked={this.state.isPatient} onChange={this.handlePatientChange} />
          <label htmlFor="signupVolunteer">Volunteer</label>
          <input id="signupVolunteer" value="volunteer" name="signupRadio" type="radio" checked={!this.state.isPatient} onChange={this.handlePatientChange}/>
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='signupName'>Name</label>
          <input type='text' required={true} id='signupName' value={this.state.lastName} onChange={this.handleNameChange} />
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='signupLocation'>Location</label>
          <input type='text' required={true} id='signupLocation' value={this.state.location} onChange={this.handleLocationChange} />
        </InputElementContainer>
        <InputElementContainer>
        <label htmlFor="signupDescription">Description</label>
        <textarea id="signupDescription" required={true} value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='signupUsername'>Email</label>
          <input type='email' id='signupUsername' required={true} value={this.state.username} onChange={this.handleUsernameChange} />
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='signupPassword'>Password</label>
          <input type='password' id='signupPassword' required={true} value={this.state.password} onChange={this.handlePasswordChange} />
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='signupPasswordConf'>Confirm Password</label>
          <input type='password' id='signupPasswordConf' value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
        </InputElementContainer>

        <HelpPicker header={`Select what you ${this.state.isPatient ? 'need' : 'can'} help with`} helpTypes={this.state.helpTypes} handleChange={this.handleHelpChange} />
        <input type="submit" value="Sign up" />
      </StyledForm>
    );
  }
}

Signup.contextType = UserContext;

export default Signup;
