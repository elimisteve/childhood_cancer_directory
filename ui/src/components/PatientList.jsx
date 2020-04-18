import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Patient from './Patient.jsx';
import api from '../api';

const StyledDiv = styled.div``;

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <Patient
            key={patient.id} name={patient.name}
            location={patient.location} />
        ))}
      </StyledDiv>
    );
  }
  return (<div>loading</div>);
};
export default PatientList;
