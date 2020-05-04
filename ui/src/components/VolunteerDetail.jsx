import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../api';
import Loader from './Loader';
import ErrorBox from './ErrorBox.jsx';

const StyledContainer = styled.div`
background-color:  ${(props) => props.theme.colors.main};
display: flex;
flex-direction: column;
max-width: 700px;
border-radius: 5px;
padding-left: 2.5rem;
padding-right: 2.5rem;
margin-left: auto;
margin-right: auto;
`;

const StyledElement = styled.div`
padding: 10px;
border-bottom: 2px solid grey;
`;

const StyledH2 = styled.h2`
margin-left: auto;
margin-right: auto;
`;

const VolunteerDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [volunteer, setVolunteer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/volunteers/${id}`).then((response) => {
      setVolunteer(response.data);
      setLoading(false);
      setError(null);
    }).catch((err) => {
      setLoading(false);
      setError(err.response.data);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <StyledContainer >
      <StyledH2>{volunteer.name}</StyledH2>
      <StyledElement>Location: {volunteer.location} </StyledElement>
      <StyledElement>About: {volunteer.description} </StyledElement>
      <StyledElement>
        <StyledH2>Able to help with:</StyledH2>
        {volunteer.help_types.map(((elem) => (
          <div key={elem.id} >
            {elem.name}
          </div>
        )))}
      </StyledElement>
      <StyledH2>Currently helping:</StyledH2>
      {volunteer.network.map(((elem) => (
        <div key={elem.id} >
          {elem.name}
        </div>
      )
      ))}

    </StyledContainer>
  );
};

export default VolunteerDetail;
