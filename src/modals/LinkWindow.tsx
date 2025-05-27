import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useStore } from "../contexts/store";

import ModalWindow from "../components/ModalWindow";
import { Button } from "../components/Button";
import { Message } from "../components/Message";
import useGetGame from "../hooks/useGetGame";
import { useLocation } from "react-router-dom";

function LinkWindow() {
  const [isCloseLinkWindow, setIsCloseLinkWindow] = useState<"open" | "close">(
    "close"
  );

  const { gameId, side } = useStore();
  const { data: game, isLoading } = useGetGame(gameId);
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  const oneTimeOnly = useRef(true);

  useEffect(() => {
    if (oneTimeOnly.current) {
      if (
        game &&
        side &&
        ((game.userIdX && !game.userIdO) || (!game.userIdX && game.userIdO))
      ) {
        setIsCloseLinkWindow("open");
        oneTimeOnly.current = false;
      }
    }
  }, [game, side, isLoading]);

  function handleCopyLink() {
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied successfully");
    setIsCloseLinkWindow("close");
  }

  return (
    <ModalWindow isOpen={isCloseLinkWindow === "open"}>
      <Wrapper>
        <LinkMessage>
          <span> Room link:</span> {fullUrl}
        </LinkMessage>
        <ButtonsWrapper>
          <LinkWindowButton onClick={handleCopyLink}>
            Copy link
          </LinkWindowButton>
          <LinkWindowButton onClick={() => setIsCloseLinkWindow("close")}>
            Close
          </LinkWindowButton>
        </ButtonsWrapper>
      </Wrapper>
    </ModalWindow>
  );
}

const LinkMessage = styled(Message)`
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0px;

  span {
    font-size: 1.25rem;
  }
`;

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

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const LinkWindowButton = styled(Button)`
  width: 100%;
  flex: 1;

  &:first-child {
    flex: 2;
  }

  background-color: var(--color-primary);
  color: var(--color-surface);

  &:hover {
    background-color: var(--color-primary-hover);
    transition: background-color 0.2s;
  }
`;

export default LinkWindow;
