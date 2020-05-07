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

const StyledText = styled.p`
font-size: ${(props) => props.theme.fontSizes.small}
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
            <ListItem key={volunteer.id}>
            <h2>
              <StyledLink to={`${url}/${volunteer.id}`} >
                {volunteer.name}
              </StyledLink>
          {' / '}
              <a href={`mailto:${volunteer.user_name}`}>{volunteer.user_name}</a>
            </h2>
              <StyledText>{volunteer.description}</StyledText>
              <StyledText>{volunteer.location}</StyledText>
            </ListItem>
        ))}
      </StyledDiv>
    );
  }
  return (
    <Loader/>
  );
};

export default VolunteerList;
