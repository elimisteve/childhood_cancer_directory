import React from 'react';
import styled from 'styled-components';

const StyledP = styled.p`
margin: auto;
max-width: 1000px;
font-size: ${(props) => props.theme.fontSizes.medium}
`;

const AboutText = (props) => (
  <StyledP>
    The Childhood Cancer Directory links children with cancer to helpful people and resources.

    If you are a childhood cancer patient, or the caretaker of one, please signup as a Patient. We’ll email you to learn how we can help.

    If you want to support children with cancer during and/or after the COVID-19 Pandemic, please signup as a Volunteer. We’ll email you to explain how you can help.
  </StyledP>
);

export default AboutText;
