import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../contexts/store";

import ModalWindow from "../components/ModalWindow";
import { Button } from "../components/Button";
import { Message } from "../components/Message";

function GameOverWindow() {
  const [isCloseGameOverWindow, setIsCloseGameOverWindow] = useState<
    "open" | "close"
  >("close");
  const { isGameOver } = useStore();

  useEffect(() => {
    if (isGameOver.message) {
      setIsCloseGameOverWindow("open");
      setTimeout(() => setIsCloseGameOverWindow("close"), 2000);
    }
  }, [isGameOver.message]);

  return (
    <ModalWindow isOpen={isCloseGameOverWindow === "open"}>
      <Wrapper>
        <Message>{isGameOver.message}</Message>
        <ButtonCloseModalWindow
          onClick={() => setIsCloseGameOverWindow("close")}
        >
          Close
        </ButtonCloseModalWindow>
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

const ButtonCloseModalWindow = styled(Button)`
  width: 100%;

  background-color: var(--color-primary);
  color: var(--color-surface);

  &:hover {
    background-color: var(--color-primary-hover);
    transition: background-color 0.2s;
  }
`;

export default GameOverWindow;
