import React, {useState, useEffect} from 'react';
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
            <ListItem key={patient.id}>
            <h2>
              <StyledLink to={`${url}/${patient.id}`} >
                {patient.name}
              </StyledLink>
              {' / '}
              <a href={`mailto:${patient.user_name}`}>{patient.user_name}</a>
            </h2>
              <div>{patient.description}</div>
              <div>{patient.location}</div>
            </ListItem>
        ))}
      </StyledDiv>
    );
  }
  return (<Loader />);
};
export default PatientList;
