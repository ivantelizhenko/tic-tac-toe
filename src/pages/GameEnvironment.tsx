import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import useGetGame from "../hooks/useGetGame";
import useAddPlayer from "../hooks/useAddPlayer";
import useRealtimeGame from "../hooks/useRealtimeGame";
import useResetGame from "../hooks/useResetGame";
import useDeleteGame from "../hooks/useDeleteGame";

import { useStore } from "../contexts/store";
import type { SideType } from "../contexts/storeTypes";

import {
  getUserIdFromLocalStorage,
  setUserIdToLocalStorage,
} from "../utils/helpers";

import Spinner from "../components/Spinner";
import Board from "../components/Board";
import { Button } from "../components/Button";
import ChooseSide from "../modals/ChooseSide";
import GameOverWindow from "../modals/GameOverWindow";

function GameEnviroment() {
  const navigate = useNavigate();
  const { gameId: gameIdFromLink } = useParams();
  const isSecondTimeGetGame = useRef<boolean>(false);
  const [isOpenChooseWindow, setIsOpenChooseWindow] = useState(false);
  const [selectedSide, setSelectedSide] = useState<"X" | "O" | null>(null);

  const { side, isGameOver, setGameId, setBoard, setTurn, setUserId, setSide } =
    useStore();
  const { data: game, isLoading: isLoadingGame } = useGetGame(
    gameIdFromLink || null
  );
  const { resetGame: resetGameDB } = useResetGame();
  const { deleteGame } = useDeleteGame();
  const { addPlayer } = useAddPlayer();

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
        if (userIdFromLocalStorage && (isXPlayer || isOPlayer)) {
          setSide((isXPlayer || isOPlayer) as SideType);
          setUserId(userIdFromLocalStorage!);
        }
      } else if (game === null) {
        // Якщо немає гри за цим gameId з посилання, то перенаправляти на сторінку Menu
        navigate("/menu");
      }
    }
  }, [game, setGameId, setUserId, setBoard, setTurn, setSide, navigate]);

  function handleReset() {
    if (game && game.userIdX && game.userIdO) {
      resetGameDB(game.id!);
    }
  }

  function handleBackMenu() {
    if (game.id) {
      deleteGame(game.id);
    }
  }

  if (isLoadingGame) return <Spinner />;

  return (
    <Wrapper>
      <Board />
      <ChooseSide isOpen={isOpenChooseWindow} handleChoose={setSelectedSide} />
      <GameOverWindow />
      {side && side !== "spectate" && isGameOver.message && (
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      )}
      {side && side !== "spectate" && (
        <BackToMenuButton onClick={handleBackMenu}>
          Back to menu
        </BackToMenuButton>
      )}
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

const BackToMenuButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20%;

  @media (max-width: 1000px) {
    width: 40%;
  }
`;

const ResetButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
  width: 50%;
  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export default GameEnviroment;
