import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ListItem from '../styles/ListItem';

const Patient = (props) => {
  console.log('props in patient', props);
  const { url } = useRouteMatch();
  return (
  <Link to={`${url}/${props.id}`} >
    <ListItem>
      <h2>{`${props.name}`}</h2>
      {props.location}
    </ListItem>
  </Link>
  );
};


Patient.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Patient;
