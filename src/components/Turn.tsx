import styled from "styled-components";
import { useStore } from "../contexts/store";
import O from "./O";
import X from "./X";

function Turn() {
  const { turn } = useStore();

  return <Wrapper $isO={turn === "O"}> {turn === "O" ? <O /> : <X />}</Wrapper>;
}

const Wrapper = styled.p<{ $isO: boolean }>`
  display: flex;
  font-size: 5rem;
  position: absolute;
  left: 0;
  top: -10%;
  color: ${({ $isO }) => ($isO ? "var(--color-white)" : "var(--color-gray)")};
  width: 40px;

  @media (max-width: 750px) {
    top: -20%;
    width: 30px;
  }
`;

export default Turn;
