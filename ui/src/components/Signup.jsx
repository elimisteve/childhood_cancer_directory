import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import HelpPicker from './HelpPicker.jsx';
import api, {setToken} from '../api';
import UserContext from '../UserContext';
import UserForm from '../styles/UserForm';


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
      checkedHelpTypes: new Set(),
    };
  }

  componentDidMount() {
    console.log('context', this.context);
    api.get('/helpTypes').then((res) => {
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
    const id = parseInt(event.target.id.match(/\d+$/)[0], 10);
    const nextChecked = new Set(this.state.checkedHelpTypes);
    if (event.target.checked) {
      nextChecked.add(id);
    } else {
      nextChecked.delete(id);
    }
    this.setState({ checkedHelpTypes: nextChecked }, () => {
      console.log('after help change', this.state.checkedHelpTypes);
    });
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
    const helpTypeIds = [...this.state.checkedHelpTypes];
    console.log('help types in submit', helpTypeIds);
    api.post('/signup', {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      location: this.state.location,
      description: this.state.description,
      isPatient: this.state.isPatient,
      helpTypeIds,
    }).then((response) => {
      console.log('RESPONSE', response);
      this.context.setUser(response.data.user);
      setToken(response.data.user.token);
      if (response.data.user.isPatient) {
        this.props.history.push('/volunteers');
      }
      else {
        this.props.history.push('/patients');
      }
    }).catch((error) => {
    });
  }


  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <UserForm onSubmit={this.handleSubmit}>
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

        <HelpPicker header={`Select what you ${this.state.isPatient ? 'need' : 'can'} help with`} helpTypes={this.state.helpTypes} checked={this.state.checkedHelpTypes} handleChange={this.handleHelpChange} />
        <input type="submit" value="Sign up" />
      </UserForm>
    );
  }
}

Signup.contextType = UserContext;
export default withRouter(Signup);
