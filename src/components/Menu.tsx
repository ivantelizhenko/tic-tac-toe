import styled from "styled-components";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import useCreateGame from "../hooks/useCreateGame";
import useGetGame from "../hooks/useGetGame";
import { useStore } from "../contexts/store";
import { useEffect } from "react";

function Menu() {
  const { gameId, setGameId } = useStore();
  const navigate = useNavigate();
  const { createGame, isPending } = useCreateGame();
  const { data: game } = useGetGame(gameId);

  useEffect(() => {
    if (game?.id) {
      navigate(`/game/${game.id}`);
    }
  }, [game, navigate]);

  async function handleStart() {
    const id = Math.random().toString();
    setGameId(id);
    createGame(id);
  }

  return (
    <Wrapper>
      <MenuButton onClick={handleStart} disabled={isPending}>
        Start
      </MenuButton>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const MenuButton = styled(Button)`
  background-color: var(--color-surface);
  color: var(--color-primary-darker);
  padding-left: 128px;
  padding-right: 128px;

  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

export default Menu;
