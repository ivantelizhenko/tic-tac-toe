import styled from "styled-components";

export const Button = styled.button`
  font-weight: bold;
  padding: 0.75rem 2rem;
  font-size: 1.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  transition: background-color 0.5s;

  &:hover {
    transition: background-color 0.2s;
  }

  &:disabled {
    opacity: 0.4;
    background-color: var(--color-disabled);
  }
`;
