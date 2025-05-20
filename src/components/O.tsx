import styled from "styled-components";

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
      <circle cx="16" cy="16" r="14.5" />
    </Svg>
  );
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  stroke: var(--color-x);
`;

export default O;
