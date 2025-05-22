import styled from "styled-components";
import { useStore } from "../contexts/store";
import { createBoard } from "../utils/utils";
import useResetGame from "../hooks/useResetGame";
import useGetGame from "../hooks/useGetGames";
import ModalWindow from "./ModalWindow";

function GameOverWindow() {
  const { isGameOver, reset, setBoard, side } = useStore();

  const { resetGame } = useResetGame();
  const { data: game } = useGetGame();

  function handleReset() {
    if (side) {
      if (game && game.userIdX && game.userIdO) {
        resetGame();
      }
      setBoard(createBoard());
      reset();
    }
  }

  return (
    <ModalWindow isOpen={!!isGameOver.message}>
      <Wrapper>
        <Message>{isGameOver.message}</Message>
        <ButtonReset onClick={handleReset} disabled={!side}>
          Reset
        </ButtonReset>
      </Wrapper>
    </ModalWindow>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-modal-bg);
  color: var(--color-x);
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

const ButtonReset = styled.button`
  background-color: var(--color-main);
  color: var(--color-modal-bg);
  font-weight: bold;
  padding: 0.75rem 2rem;
  font-size: 1.5rem;
  border-radius: 6px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;

  background-color: var(--color-main);
  border: none;

  transition: background-color 0.5s;

  &:hover {
    transition: background-color 0.2s;
    background-color: var(--color-main-darker-lite);
  }

  &:disabled {
    opacity: 0.4;
    background-color: #ccc;
  }
`;

export default GameOverWindow;
