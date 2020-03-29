import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../styles/ListItem';

const Offer = (props) => (
  <ListItem>
    <h2>{props.name}</h2>
    {props.description}
  </ListItem>
);

Offer.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Offer;
