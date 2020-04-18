import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../styles/ListItem';

const Patient = (props) => (
  <ListItem>
    <h2>{`${props.name}`}</h2>
    {props.location}
  </ListItem>
);


Patient.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default Patient;
