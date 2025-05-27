import styled, { keyframes } from "styled-components";

function O() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-icon lucide-circle"
    >
      <AnimatedCircle cx="16" cy="16" r="14.5" />
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
  stroke: var(--color-white);
`;

const AnimatedCircle = styled.circle`
  stroke-dasharray: 91;
  stroke-dashoffset: 91;
  animation: ${draw} 0.6s ease forwards;
`;

export default O;
