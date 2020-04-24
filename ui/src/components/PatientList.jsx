import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ListItem from '../styles/ListItem';
import api from '../api';

const StyledDiv = styled.div``;

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
      <h1>Patients</h1>
        {patients.map((patient) => (
          <Link to={`${url}/${patient.id}`} key={patient.id} >
            <ListItem>
              <h2>{`${patient.name}`}</h2>
              <div>{patient.description}</div>
              <div>{patient.location}</div>
            </ListItem>
          </Link>
        ))}
      </StyledDiv>
    );
  }
  return (<div>loading</div>);
};
export default PatientList;
