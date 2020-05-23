import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ListItem from '../styles/ListItem';
import ErrorBox from './ErrorBox.jsx';
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

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url } = useRouteMatch();

  useEffect(() => {
    if (error) {
      setError(null);
    }
    api.get('/patients').then((response) => {
      setPatients(response.data);
      setLoading(false);
    }).catch((err) => {
      setError(true);
    });
  }, []);

  if (error) {
    return <ErrorBox message='Must login to fetch patients'/>;
  }
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
            <StyledText>{patient.description}</StyledText>
            <StyledText>{patient.location}</StyledText>
          </ListItem>
        ))}
      </StyledDiv>
    );
  }
  return (<Loader />);
};
export default PatientList;
