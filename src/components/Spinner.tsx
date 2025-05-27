import styled, { keyframes } from "styled-components";

function Spinner() {
  return (
    <div>
      <StyledSpinner />
    </div>
  );
}

const rotation = keyframes` 
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }`;

const StyledSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid var(--color-white);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export default Spinner;
