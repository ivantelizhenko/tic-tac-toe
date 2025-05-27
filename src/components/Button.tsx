import styled from "styled-components";

export const Button = styled.button`
  font-weight: bold;
  padding: 6px 12px;
  font-size: 1.5rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  transition: background-color 0.5s;
  white-space: nowrap;

  background-color: var(--color-surface);
  color: var(--color-primary);

  @media (max-width: 750px) {
    font-size: 1.25rem;
  }

  &:hover {
    background-color: var(--color-surface-hover);
    transition: background-color 0.2s;
  }

  &:disabled {
    opacity: 0.4;
    background-color: var(--color-disabled);
  }
`;
