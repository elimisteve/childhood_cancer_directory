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
position: absolute;
top: 50%;
margin: auto;
width: 100%;
height: 100%;
text-align: center;
`;

const Rotate = styled.div`
 display: inline-block;
 animation: ${rotate} 1s linear infinite;
 padding: 2rem 1rem;
`;

const StyledImg = styled.img`
max-height: 50px;
width: auto;
`;


const Loader = () => (
  <Container>
    <Rotate><StyledImg src={HandsPurple} /> </Rotate>
  </Container>
);

export default Loader;
