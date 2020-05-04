import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ListItem from '../styles/ListItem';
import Loader from './Loader.jsx';
import api from '../api';

const StyledDiv = styled.div``;
const StyledH1 = styled.h1`
margin-left: 2%;
`;
const StyledLink = styled(Link)`
color:black;
text-decoration: none;
`;

const VolunteerList = () => {
  const [loading, setLoading] = useState(true);
  const [volunteers, setVolunteers] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    api.get('/volunteers').then((response) => {
      console.log('vlist response', response);
      setVolunteers(response.data);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <StyledDiv>
        <StyledH1>Volunteers</StyledH1>
        {volunteers.map((volunteer) => (
          <StyledLink to={`${url}/${volunteer.id}`} key={volunteer.id}>
            <ListItem key={volunteer.id}>
              <h1>{`${volunteer.name}`}</h1>
              <div>{volunteer.description}</div>
              <div>{volunteer.location}</div>
            </ListItem>
          </StyledLink>
        ))}
      </StyledDiv>
    );
  }
  return (
    <Loader/>
  );
};

export default VolunteerList;
