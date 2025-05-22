import { useEffect, useRef } from "react";
import styled from "styled-components";
import X from "./X";
import O from "./O";
import useGetGame from "../hooks/useGetGames";

function ChooseSide({
  handleChoose,
  isOpen,
}: {
  handleChoose: (value: "X" | "O") => void;
  isOpen: boolean;
}) {
  const { data } = useGetGame();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current === null) return;
    if (isOpen) {
      dialog.current.showModal();
      dialog.current.style.display = "flex";
    } else {
      dialog.current.close();
      dialog.current.style.display = "none";
    }
  }, [isOpen]);

  const userXExist = !!data?.userIdX;
  const userOExist = !!data?.userIdO;

  return (
    <Wrapper ref={dialog}>
      <Block onClick={() => handleChoose("X")} disabled={userXExist}>
        <X />
      </Block>
      <Block onClick={() => handleChoose("O")} disabled={userOExist}>
        <O />
      </Block>
    </Wrapper>
  );
}

const Wrapper = styled.dialog`
  display: flex;
  gap: 36px;
  justify-content: center;
  align-items: center;
  padding: 36px 48px;
  width: 50%;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  border: none;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--color-main-lighter);
  box-shadow: 0 2px 4px rgba(0 0 0/ 0.2);
  border-radius: 6px;

  &::backdrop {
    width: 150%;
    height: 150%;
    backdrop-filter: blur(3px);
  }
`;

const Block = styled.button`
  border-radius: 12px;
  padding: 24px;
  flex: 1;
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

export default ChooseSide;
