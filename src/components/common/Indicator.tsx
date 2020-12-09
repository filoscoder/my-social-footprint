import React from 'react';
import styled from 'styled-components';

const Container = styled.svg`
  width: 40px;
  height: 40px;
  position: absolute;
  animation: spin 1s linear infinite;
  position: absolute;
  z-index: 15;
  top: 50%;
  left: 50%;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Circle = styled.circle`
  fill: none;
  stroke: rgba(0, 0, 0, 0.75);
  stroke-linecap: round;
  stroke-width: 5;
  animation: draw 3s ease-in-out infinite;

  @keyframes draw {
    0% {
      stroke-dasharray: 20, 282.6;
    }
    50% {
      stroke-dasharray: 200, 282.6;
    }
    100% {
      stroke-dasharray: 20, 282.6;
    }
  }
`;

interface Props { }

export default function Indicator(props: Props) {
  return (
    <Container viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45"></Circle>
    </Container>
  );
}
