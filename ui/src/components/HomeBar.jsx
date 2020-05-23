import React from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import UserContext from '../UserContext';

const StyledBar = styled.div`
text-align: center;
flex:1;
height: 100%;
`;

const StyledLink = styled(Link)`
font-size: ${(props) => props.theme.fontSizes.medium};
color: ${(props) => props.theme.colors.secondary};
top: 50%;
padding-right: 1rem;
`;


const HomeBar = () => (
  <UserContext.Consumer>
    {(value) => (
    <StyledBar>
      <StyledLink to={value.user.user_name ? '/patients' : '/signup'}>Childhood Cancer Directory</StyledLink>
    </StyledBar>
    )}
  </UserContext.Consumer>
);

export default HomeBar;
