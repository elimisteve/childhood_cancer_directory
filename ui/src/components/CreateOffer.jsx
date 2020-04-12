import React from 'react';
import api from '../api';
import styled from 'styled-components';

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
    this.state = {name: '', description: '', open: false};
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
    api.post('offers', {
      name: this.state.name,
      description: this.state.description,
    });
    event.preventDefault();
  }

  render() {
    return (
        <StyledForm onSubmit={this.handleSubmit}>
          <label for='offerName'> Name </label>
        <textarea id='offerName' value={this.state.name} onChange={this.handleNameChange}/> 
          <label for='offerDescription'>Description</label>
        <textarea id='offerDescription' value={this.state.description} onChange={this.handleDescriptionChange}/>
          <input type="submit" value="Submit" />
        </StyledForm>

    )
  }
}

export default CreateOffer;