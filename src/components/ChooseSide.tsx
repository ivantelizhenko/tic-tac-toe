import styled from "styled-components";
import X from "./X";
import O from "./O";

import ModalWindow from "./ModalWindow";
import useGetGame from "../hooks/useGetGame";
import { useStore } from "../contexts/store";

function ChooseSide({
  handleChoose,
  isOpen,
}: {
  handleChoose: (value: "X" | "O") => void;
  isOpen: boolean;
}) {
  const { gameId } = useStore();
  const { data: game } = useGetGame(gameId);

  const userXExist = !!game?.userIdX;
  const userOExist = !!game?.userIdO;

  return (
    <ModalWindow isOpen={isOpen}>
      <Wrapper>
        <Block onClick={() => handleChoose("X")} disabled={userXExist}>
          <X />
        </Block>
        <Block onClick={() => handleChoose("O")} disabled={userOExist}>
          <O />
        </Block>
      </Wrapper>
    </ModalWindow>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
  justify-content: center;
  align-items: center;
  padding: 36px 48px;
  background-color: var(--color-primary-lighter);

  @media (max-width: 750px) {
    padding: 24px 24px;
  }
`;

const Block = styled.button`
  border-radius: 12px;
  padding: 24px;
  flex: 1;
  background-color: var(--color-primary);
  border: none;

  transition: background-color 0.5s;

  &:hover {
    transition: background-color 0.2s;
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.4;
    background-color: var(--color-disabled);
  }
`;

export default ChooseSide;
