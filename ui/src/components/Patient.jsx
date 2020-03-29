import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../styles/ListItem';

const Patient = (props) => (
  <ListItem>
    <h1>{`${props.firstname} ${props.lastname}`}</h1>
    {props.location}
  </ListItem>
);


Patient.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default Patient;
