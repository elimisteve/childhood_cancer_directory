import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../styles/ListItem';

const Volunteer = (props) => (
  <ListItem>
    <h1>{`${props.name}`}</h1>
    {props.location}
  </ListItem>
);


Volunteer.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default Volunteer;
