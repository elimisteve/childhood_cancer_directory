import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
width: 100%;
display: flex;
height: ${props => props.theme.footerSize};
justify-content: space-around;
`;

const StyledP = styled.p`
font-size: ${props => props.theme.fontSizes.medium};
color: ${props => props.theme.colors.secondary};
margin: auto;
&>a{
color: ${props => props.theme.colors.secondary};
}
`;


const Footer = () => {
  return (
    <StyledFooter>
      <StyledP><a href='https://guardiome.org'>Guardiome</a> &copy; 2020</StyledP>
      <StyledP><a href={'mailto:team@guardiome.com'}>Contact Us</a></StyledP>
    </StyledFooter>
  );
};

export default Footer;
