import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import HelpPicker from './HelpPicker.jsx';
import Loader from './Loader.jsx';
import UserForm from '../styles/UserForm';
import api, { setToken } from '../api';
import UserContext from '../UserContext';

const InputElementContainer = styled.div`
padding: 20px;
border-bottom: 2px solid grey;
`;

class UserProfile extends React.Component {
  constructor(props) {
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
      error: null,
    };
  }

  componentDidMount() {
    console.log('context', this.context);
    api.get('/helpTypes').then((res) => {
      const { user } = this.context;
      if (!user) {
        this.props.history.push('/signin');
      }
      console.log('context in user profile', user);
      this.setState({
        location: user.location,
        helpTypes: res.data,
        loading: false,
        checkedHelpTypes: new Set(this.context.user.helpTypes.map((elem) => (elem.id))),
        name: user.name,
        description: user.description,
        username: user.user_name,
      });
    }).catch((err) => {
      console.log('error in userprofile', err);
      // TODO ERROR HANDLING;
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    api.post('/users/edit', {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      username: this.state.username,
      password: this.state.password,
      id: this.context.user.id,
      helpTypeIds: [...this.state.checkedHelpTypes],
    }).then((updatedUser) => {
      this.context.setUser(updatedUser.data);
      setToken(updatedUser.data.token);
      this.props.history.push('/patients');
    }).catch((error) => {
      console.log('an error occured');
    });

  }

  handleHelpChange = (event) => {
    console.log('event in handle help change', event.target);
    const id = parseInt(event.target.id.match(/\d+$/)[0], 10);
    const nextChecked = new Set(this.state.checkedHelpTypes);
    if (event.target.checked) {
      nextChecked.add(id);
    } else {
      nextChecked.delete(id);
    }
    this.setState({ checkedHelpTypes: nextChecked });
  }

  handlePatientChange = () => {
    this.setState({ isPatient: !this.state.isPatient });
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
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

  render() {
    if (this.state.loading) {
      return <Loader/>;
    }
    return (
      <UserForm onSubmit = {this.handleSubmit}>
        <InputElementContainer>
          <label htmlFor='profileName'>Name</label>
          <input type='text' required={true} id='profileName' value={this.state.name} onChange={this.handleNameChange} />
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='profileLocation'>Location</label>
          <input type='text' required={true} id='profileLocation' value={this.state.location} onChange={this.handleLocationChange} />
        </InputElementContainer>
        <InputElementContainer>
        <label htmlFor="profileDescription">Description</label>
        <textarea id="profileDescription" required={true} value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='profileUsername'>Email</label>
          <input type='email' id='profileUsername' required={true} value={this.state.username} onChange={this.handleUsernameChange} />
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='profilePassword'>Password (leave blank to not change)</label>
          <input type='password' id='profilePassword' value={this.state.password} onChange={this.handlePasswordChange} />
        </InputElementContainer>
        <InputElementContainer>
          <label htmlFor='profilePasswordConf'>Confirm Password</label>
          <input type='password' id='profilePasswordConf' value={this.state.passwordConf} onChange={this.handlePasswordConfChange} />
        </InputElementContainer>
        <HelpPicker header='Help types' helpTypes={this.state.helpTypes} handleChange={this.handleHelpChange} checked={this.state.checkedHelpTypes} />
        <input type='submit' value='save'/>
      </UserForm>
    );

  }
}

UserProfile.contextType = UserContext;
export default withRouter(UserProfile);
