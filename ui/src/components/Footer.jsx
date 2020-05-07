import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
position: absolute;
width: 100%;
bottom: 0;
max-height: 75px;
background-color : ${(props) => (props.theme.colors.main)};
display: flex;
justify-content: space-around;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p><a href='https://guardiome.org'>Guardiome</a> &copy; 2020</p>
      <p><a href={'mailto:team@guardiome.com'}>Contact Us</a></p>
    </StyledFooter>
  );
};

export default Footer;
