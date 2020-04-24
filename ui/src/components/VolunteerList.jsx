import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from '../styles/ListItem';
import api from '../api';

const StyledDiv = styled.div``;

const VolunteerList = () => {
  const [loading, setLoading] = useState(true);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    api.get('/volunteers').then((response) => {
      setVolunteers(response.data);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <StyledDiv>
        {volunteers.map((volunteer) => (
          <ListItem key={volunteer.id}>
            <h1>{`${volunteer.name}`}</h1>
            <div>{volunteer.description}</div>
            <div>{volunteer.location}</div>
          </ListItem>
        ))}
      </StyledDiv>
    );
  }
  return (
    <div>loading</div>
  );
};

export default VolunteerList;
