import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Patient from './Patient.jsx';

const StyledDiv = styled.div``;

const PatientList = (props) => (
  <StyledDiv>
    {props.patients.map((patient) => (
      <Patient
        key={patient.id} name={patient.name}
        location={patient.location} />
    ))}
  </StyledDiv>
);

PatientList.propTypes = {
  patients: PropTypes.array.isRequired,
};

export default PatientList;
