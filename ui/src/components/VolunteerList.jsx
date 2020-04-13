import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Volunteer from './Volunteer.jsx';
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
          <Volunteer
            key={volunteer.id} name={volunteer.name}
            location={volunteer.location} />
        ))}
      </StyledDiv>
    );
  }
  return (
    <div>loading</div>
  );
};

export default VolunteerList;
