import { useEffect, useRef, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";

function ModalWindow({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current === null) return;
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  return <Wrapper ref={dialog}>{children}</Wrapper>;
}

const showIn = keyframes`
  from{
    opacity: 0;
  }

  to {
    opacity: 1;

  }

`;

const Wrapper = styled.dialog`
  width: 50%;
  z-index: 5000;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  border: none;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 2px 4px rgba(0 0 0/ 0.2);
  border-radius: 6px;

  animation: ${showIn} 1s both;

  @media (max-width: 750px) {
    width: 90%;
  }

  &::backdrop {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
  }
`;

export default ModalWindow;
