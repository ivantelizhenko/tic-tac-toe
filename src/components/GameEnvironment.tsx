import styled from "styled-components";

import useGetGame from "../hooks/useGetGame";
import Spinner from "./Spinner";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../contexts/store";
import Board from "./Board";
import { getUserIdFromLocalStorage } from "../utils/helpers";
import ChooseSide from "./ChooseSide";
import type { SideType } from "../contexts/storeTypes";

function GameEnviroment() {
  const navigate = useNavigate();
  const { side, setGameId, setBoard, setTurn, setUserId, setSide } = useStore();
  const { gameId: gameIdFromLink } = useParams();
  const { data: game, isLoading: isLoadingGame } = useGetGame(
    gameIdFromLink || null
  );
  const isSecondTimeGetGame = useRef<boolean>(false);
  const [isOpenChooseWindow, setIsOpenChooseWindow] = useState(true);
  const [selectedSide, setSelectedSide] = useState<"X" | "O" | null>(null);

  useEffect(() => {
    if (selectedSide) {
      setSide(selectedSide);
    }
  }, [selectedSide, setSide]);

  useEffect(() => {
    if (game) {
      setIsOpenChooseWindow(
        !side && (!game.userIdO || !game.userIdX) && selectedSide === null
      );
    }
  }, [side, game, selectedSide]);

  useEffect(() => {
    if (!isSecondTimeGetGame.current) {
      if (game) {
        isSecondTimeGetGame.current = true;
        const userIdFromLocalStorage = getUserIdFromLocalStorage();
        const isXPlayer = userIdFromLocalStorage === game.userIdX && "X";
        const isOPlayer = userIdFromLocalStorage === game.userIdO && "O";
        const board = JSON.parse(game.board);

        setGameId(game.id);
        setBoard(board);
        setTurn(game.turn);
        if (isXPlayer || isOPlayer) {
          setSide((isXPlayer || isOPlayer) as SideType);
          setUserId(userIdFromLocalStorage!);
        }
      } else if (game === null) {
        // Якщо немає гри за цим gameId з посилання, то перенаправляти на сторінку Menu
        navigate("/menu");
      }
    }
  }, [game, setGameId, setUserId, setBoard, setTurn, setSide, navigate]);

  if (isLoadingGame) return <Spinner />;

  return (
    <Wrapper>
      <Board />
      <ChooseSide isOpen={isOpenChooseWindow} handleChoose={setSelectedSide} />
      {/* */
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
