import React from 'react';
import styled, { keyframes } from 'styled-components';
import HandsPurple from '../assets/HandsPurple.png';

const rotate = keyframes`
from{
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const Container = styled.div`
width: 100%;
height: 100%;
text-align: center;
`;

const Rotate = styled.div`
 display: inline-block;
 animation: ${rotate} 2s linear infinite;
 padding: 2rem 1rem;
`;

const StyledImg = styled.img`
height: 50%;
width: auto;
`;


const Loader = () => (
  <Container>
    <Rotate><StyledImg src={HandsPurple} /> </Rotate>
  </Container>
);

export default Loader;
