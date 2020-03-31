import React, {useState} from 'react';
import PropTypes from 'prop-types';
import api from '../api';

class CreateOffer extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: '', description: ''};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event){
    this.setState({name: event.target.value});
  }
  handleDescriptionChange(event){
    this.setState({description: event.target.value});
  }


  handleSubmit(event){
    api.post('offers', {
      name: this.state.name,
      description: this.state.description,
    })
    event.preventDefault();

  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Description:
        <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}


/*
const CreateOffer = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false)


  const handleSubmit = function(){
   
  }

  if(open){
  return(
    <form>
      <label>
        Name:
        <input type="text" value={name.value} onChange={setName}/>
      </label>
      <label>
        Description:
        <input type="text" value={description.value} onChange={setDescription}/>
      </label>
      <button onClick={handleSubmit}>Add</button>
    </form>
  )
  }
  return (<button onClick={setOpen}>Add Offer</button>)
}
*/

export default CreateOffer