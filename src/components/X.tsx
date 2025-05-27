import styled, { keyframes } from "styled-components";

function X() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-x-icon lucide-x"
    >
      <AnimatedPath d="M2 2 L30 30" />
      <AnimatedPath d="M30 2 L2 30" />
    </Svg>
  );
}

const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  stroke: var(--color-gray);
`;

const AnimatedPath = styled.path`
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: ${draw} 0.6s ease forwards;
`;

export default X;
