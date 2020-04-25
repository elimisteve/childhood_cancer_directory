import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ListItem from '../styles/ListItem';
import api from '../api';

const StyledDiv = styled.div``;

const StyledH1 = styled.h1`
margin-left: 2%;
`;

const StyledLink = styled(Link)`
color:black;
text-decoration: none;
`;

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url } = useRouteMatch();

  useEffect(() => {
    api.get('/patients').then((response) => {
      setPatients(response.data);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <StyledDiv>
      <StyledH1>Patients</StyledH1>
        {patients.map((patient) => (
          <StyledLink to={`${url}/${patient.id}`} key={patient.id} >
            <ListItem>
              <h2>{`${patient.name}`}</h2>
              <div>{patient.description}</div>
              <div>{patient.location}</div>
            </ListItem>
          </StyledLink>
        ))}
      </StyledDiv>
    );
  }
  return (<div>loading</div>);
};
export default PatientList;
