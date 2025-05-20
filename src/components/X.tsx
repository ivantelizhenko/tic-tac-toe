import styled from "styled-components";

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
      <path d="M2 2 L30 30" />
      <path d="M30 2 L2 30" />
    </Svg>
  );
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  stroke: var(--color-x);
`;

export default X;
