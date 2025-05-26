import styled from "styled-components";

import useGetGame from "../hooks/useGetGame";
import Spinner from "./Spinner";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../contexts/store";
import Board from "./Board";
import {
  getUserIdFromLocalStorage,
  setUserIdToLocalStorage,
} from "../utils/helpers";
import ChooseSide from "./ChooseSide";
import type { SideType } from "../contexts/storeTypes";
import useAddPlayer from "../hooks/useAddPlayer";
import GameOverWindow from "./GameOverWindow";
import useRealtimeGame from "../hooks/useRealtimeGame";

function GameEnviroment() {
  const navigate = useNavigate();
  const { side, setGameId, setBoard, setTurn, setUserId, setSide } = useStore();
  const { gameId: gameIdFromLink } = useParams();
  const { data: game, isLoading: isLoadingGame } = useGetGame(
    gameIdFromLink || null
  );

  const { addPlayer } = useAddPlayer();
  const isSecondTimeGetGame = useRef<boolean>(false);
  const [isOpenChooseWindow, setIsOpenChooseWindow] = useState(false);
  const [selectedSide, setSelectedSide] = useState<"X" | "O" | null>(null);

  useRealtimeGame();

  // Можна обрати бік
  useEffect(() => {
    if (selectedSide) {
      const userId = Math.random().toString();
      setUserId(userId);
      setSide(selectedSide);
      setUserIdToLocalStorage(userId);
      const userIdForAPI =
        selectedSide === "X" ? { userIdX: userId } : { userIdO: userId };
      addPlayer(userIdForAPI);
      setSelectedSide(null);
    }
  }, [selectedSide, setSide, setUserId, addPlayer]);

  // Якщо є умови для поясви вікна з обирання сторони, то тут вони встановляться і з'явиться вікно
  useEffect(() => {
    if (game) {
      setIsOpenChooseWindow(
        !side && (!game.userIdO || !game.userIdX) && selectedSide === null
      );
    }
  }, [side, game, selectedSide]);

  // При першому заходу в гру або оновлені сторінки бере гру зі db і додає її в store
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

        // Якщо ти вже гравець, то встановлює твою сторону
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
      <GameOverWindow />
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
