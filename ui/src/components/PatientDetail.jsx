import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import Loader from './Loader';
import UserContext from '../UserContext';

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

const StyledNetworkItem = styled.div`
padding: 2px;
`;

const HelpButton = styled.button`
  width: auto;
  max-width: 200px;
`;

const PatientDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null)
  const [userAssociated, setUserAssociated] = useState(false);
  useEffect(() => {
    api.get(`/patients/${id}`).then((response) => {
      setPatient(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      // TODO HANDLE ERROR
    });
  }, []);
  if (loading) {
    return (
      <Loader/>
    );
  }
  const addVolunteer = async (patientId, volunteerId) => {
    const response = await api.post(`patients/${patientId}/volunteers/${volunteerId}`);
    setPatient(response.data);
  };
  return (
    <UserContext.Consumer>
      {(value) => {
        return (
        <StyledContainer>
          <StyledH2>{patient.name}</StyledH2>
          <StyledElement>Location: {patient.location}</StyledElement>
          <StyledElement>About: {patient.description}</StyledElement>
          <div>
            <StyledH2>Needs help with:</StyledH2>
            {patient.help_types.map(((elem) => (
              <div key={elem.id} >
                {elem.name}
              </div>
            )))}
            <StyledH2>People helping:</StyledH2>
              {patient.network.map(((elem) => {
                if (elem.id === value.id) {
                  setUserAssociated(true);
                }
                return (
                  <StyledNetworkItem key={elem.id} >
                    <Link to={`/volunteers/${elem.id}`}>
                      {elem.name}
                    </Link>
                  </StyledNetworkItem>
                );
              }
              ))}
          </div>
            {(value.user.is_patient === false && userAssociated === false)
              && <HelpButton onClick={() => { addVolunteer(patient.id, value.user.id); }}>
                Help this person
              </HelpButton>}
          </StyledContainer>
        );
      }}
    </UserContext.Consumer>
  );
};

export default PatientDetail;
