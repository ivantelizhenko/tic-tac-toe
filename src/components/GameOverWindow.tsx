import styled from "styled-components";
import { useStore } from "../contexts/store";
import { createBoard } from "../utils/utils";

import useGetGame from "../hooks/useGetGame";
import ModalWindow from "./ModalWindow";
import { Button } from "./Button";
import useResetGame from "../hooks/useResetGame";

function GameOverWindow() {
  const { isGameOver, reset, setBoard, side, gameId } = useStore();

  const { resetGame } = useResetGame();
  const { data: game } = useGetGame(gameId);

  function handleReset() {
    if (game && game.userIdX && game.userIdO) {
      resetGame(gameId!);
    }
    setBoard(createBoard());
    reset();
  }

  return (
    <ModalWindow isOpen={!!isGameOver.message}>
      <Wrapper>
        <Message>{isGameOver.message}</Message>
        {side && (
          <GameOverButton onClick={handleReset} disabled={!side}>
            Reset
          </GameOverButton>
        )}
      </Wrapper>
    </ModalWindow>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-surface);
  color: var(--color-gray);
  padding: 32px;
  text-align: center;
  display: grid;
  row-gap: 24px;
  text-transform: uppercase;
`;

const Message = styled.p`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 2px;
`;

const GameOverButton = styled(Button)`
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-surface);

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export default GameOverWindow;
