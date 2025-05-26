import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button as DefaultButton } from "./Button";
import useGetGame from "../hooks/useGetGame";
import useResetGame from "../hooks/useResetGame";
import { useStore } from "../contexts/store";

function ResultButtons() {
  const [buttonsIsDisabled, setButtonIsDisabled] = useState(true);
  const { reset, gameId } = useStore();

  const { resetGame } = useResetGame();
  const { data: game } = useGetGame(gameId);

  useEffect(() => {
    setTimeout(() => setButtonIsDisabled(false), 5000);
  }, []);

  function handleReset() {
    if (game && game.userIdX && game.userIdO) {
      resetGame(gameId!);
    }
    reset();
  }

  function handleBackMenu() {
    console.log("Back to menu");
  }

  return (
    <Wrapper>
      <Button disabled={buttonsIsDisabled} onClick={handleBackMenu}>
        Back to menu
      </Button>
      <Button disabled={buttonsIsDisabled} onClick={handleReset}>
        Reset
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  transform: translateX(-50%);

  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  left: 10%;

  @media (max-width: 1200px) {
    width: 80%;
    flex-direction: row;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
  @media (max-width: 750px) {
    flex-direction: column;
    width: 80%;
    gap: 10px;
  }
`;

const Button = styled(DefaultButton)`
  white-space: nowrap;
  padding: 6px 12px;
  flex: 1;
  background-color: var(--color-surface);
  color: var(--color-primary);

  &:hover {
    background-color: var(--color-surface-hover);
  }

  @media (max-width: 1200px) {
    padding: 6px 0px;
  }
  @media (max-width: 750px) {
    letter-spacing: 2px;
    padding: 3px 0px;
  }
`;

export default ResultButtons;
