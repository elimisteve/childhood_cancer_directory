import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Volunteer from './Volunteer.jsx';

const StyledDiv = styled.div``;

const VolunteerList = (props) => (
  <StyledDiv>
    {props.volunteers.map((volunteer) => (
      <Volunteer
        key={volunteer.id} name={volunteer.name}
                location={volunteer.location} />
    ))}
  </StyledDiv>
);


VolunteerList.propTypes = {
  volunteers: PropTypes.array.isRequired,
};

export default VolunteerList;
