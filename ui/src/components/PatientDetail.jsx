import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../api';
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

const HelpButton = styled.button`
  width: auto;
  max-width: 200px;
`;

const PatientDetail = () => {
  const isPatient = sessionStorage.patient === true;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
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
      <div>loading</div>
    );
  }
  const addVolunteer = (patientId, volunteerId) => {
    alert(volunteerId);
    api.post(`patients/${patientId}/volunteers/${volunteerId}`).then((response) => {
    });

  }
  return (
    <UserContext.Consumer>
      {(value) => {
        return (
        <StyledContainer>
          <StyledH2>{patient.name}</StyledH2>
          <StyledElement>Location: {patient.location}</StyledElement>
          <StyledElement>Description: {patient.description}</StyledElement>
          <div>
            <StyledH2>Needs help with:</StyledH2>
            {patient.help_types.map(((elem) => (
              <div key={elem.id} >
                {elem.name}
              </div>
            )))}
            <StyledH2>People helping:</StyledH2>
            {patient.volunteers.map(((elem) => (
              <div key={elem.id} >
                {elem.name}
              </div>
            )))}
          </div>
          { value.user.isPatient === false && <HelpButton onClick={() => { addVolunteer(patient.id, value.user.id); } }>Help this person</HelpButton>}
        </StyledContainer>
        );
      }}
    </UserContext.Consumer>
  );
};

export default PatientDetail;
