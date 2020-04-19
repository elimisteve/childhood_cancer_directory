import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import api from '../api';

const StyledForm = styled.form`
 display: flex;
 flex-direction: column;
 background-color: ${(props) => (props.theme.colors.main)};
 padding-left: 2.5rem;
 padding-right: 2.5rem;
`;

class CreateOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '', open: false };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    api.post('/offers', {
      name: this.state.name,
      description: this.state.description,
    }).then((response) => {
      this.props.history.push('/offers');
    });
    event.preventDefault();
  }

  render() {
    return (
        <StyledForm onSubmit={this.handleSubmit}>
          <label htmlFor='offerName'> Name </label>
        <textarea id='offerName' value={this.state.name} onChange={this.handleNameChange}/> 
          <label htmlFor='offerDescription'>Description</label>
        <textarea id='offerDescription' value={this.state.description} onChange={this.handleDescriptionChange}/>
          <input type="submit" value="Submit" />
        </StyledForm>
    );
  }
}

export default withRouter(CreateOffer);
