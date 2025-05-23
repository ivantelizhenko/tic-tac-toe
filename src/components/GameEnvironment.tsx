import styled from "styled-components";

import useGetGame from "../hooks/useGetGame";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../contexts/store";
import Board from "./Board";

function GameEnviroment() {
  const navigate = useNavigate();
  const { setGameId, setBoard, setTurn } = useStore();
  const { gameId } = useParams();
  const { data: game, isLoading } = useGetGame(gameId || null);
  const [isOpenChooseWindow, setIsOpenChooseWindow] = useState(false);

  useEffect(() => {
    if (game) {
      const board = JSON.parse(game.board);
      setGameId(game.id);
      setBoard(board);
      setTurn(game.turn);
    } else {
      // Якщо немає гри за цим gameId з посилання, то перенаправляти на сторінку Menu
      navigate("/menu");
    }
  }, [game, setGameId, setBoard, setTurn, navigate]);

  if (isLoading) return <Spinner />;

  return (
    <Wrapper>
      <Board />
      {/*<ChooseSide isOpen={isOpenChooseWindow} handleChoose={setSelectedSide} />*/
      /* <GameOverWindow /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export default GameEnviroment;
