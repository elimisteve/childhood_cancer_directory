import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Volunteer from './Volunteer.jsx';

const StyledDiv = styled.div``;

const VolunteerList = (props) => (
  <StyledDiv>
    {console.log("VOLUNTEERS", props.volunteers)}
    {props.volunteers.map((volunteer) => (
      <Volunteer
        key={volunteer.id} firstname={volunteer.firstname}
        lastname={volunteer.lastname}
        location={volunteer.location} />
    ))}
  </StyledDiv>
);


VolunteerList.propTypes = {
  volunteers: PropTypes.array.isRequired,
};

export default VolunteerList;
