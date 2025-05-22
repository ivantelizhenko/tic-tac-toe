import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getIdFromLocalStorage, setIdToLocalStorage } from "./utils/helpers";
import { useStore } from "./contexts/store";

import useGetGame from "./hooks/useGetGames";
import useCreateGame from "./hooks/useCreateGame";
import useAddUserId from "./hooks/useAddUserId";
import useRealtimeGame from "./hooks/useRealtimeGame";

import ChooseSide from "./components/ChooseSide";
import Board from "./components/Board";
import GameOverWindow from "./components/GameOverWindow";

function App() {
  const [selectedSide, setSelectedSide] = useState<null | "X" | "O">(null);
  const [isOpenChooseWindow, setIsOpenChooseWindow] = useState<boolean>(false);
  const onceGetBoard = useRef(true);

  const { setUserId, userId, setSide, side, setBoard, setTurn } = useStore();
  const { data: game, isLoading: isLoadingGame } = useGetGame();
  const { createGame } = useCreateGame();
  const { addUserId } = useAddUserId();

  useRealtimeGame();

  useEffect(() => {
    if (game) {
      setIsOpenChooseWindow(
        selectedSide === null && !side && (!game.userIdO || !game.userIdX)
      );
    }
  }, [selectedSide, side, game]);

  useEffect(() => {
    const localStorageId = getIdFromLocalStorage();
    if (onceGetBoard) {
      // При першому завантажені сторінки або оновленні сторінки отримує гру і крок з сервера
      if (game && game.board) {
        onceGetBoard.current = false;
        const board = JSON.parse(game.board);
        setBoard(board);
        setTurn(game.turn);
      }

      // Якщо є гра і ти вже був у цій грі до цього, то тебе поверне в гру.
      if (game && localStorageId) {
        if (game.userIdX === localStorageId) {
          setSide("X");
        } else if (game.userIdO === localStorageId) {
          setSide("O");
        }
      }
    }
  }, [game, setBoard, setTurn, setSide]);

  // Якщо є можливість обрати бік, то після додає гравця до гри
  useEffect(() => {
    if (selectedSide !== null && userId) {
      setSide(selectedSide);
      setSelectedSide(null);
      addUserId({ side: selectedSide, userId });
    }
  }, [selectedSide, setSide, addUserId, userId]);

  // Встановити id гравця. Чи то з localStorage, якщо там є, чи створити нове
  useEffect(() => {
    console.log("id");
    const localStorageId = getIdFromLocalStorage();
    const id = Math.random().toString();
    if (localStorageId) {
      setUserId(localStorageId);
    } else {
      setUserId(id);
      setIdToLocalStorage(id);
    }
  }, [setUserId]);

  // Якщо в db немає гри, то створити
  useEffect(() => {
    if (!isLoadingGame && userId && !game) {
      createGame();
    }
  }, [game, isLoadingGame, userId, createGame]);

  // TODO: add spinner
  if (isLoadingGame) return <p>Spinner</p>;

  return (
    <Wrapper>
      <Board />
      <ChooseSide isOpen={isOpenChooseWindow} handleChoose={setSelectedSide} />
      <GameOverWindow />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  --color-main: #18bdac;
  --color-main-darker-lite: #16b1a4;
  --color-main-darker: #0ca192;
  --color-main-lighter: #50d3c4;
  --color-x: #545453;
  --color-o: #f2ecd2;
  --color-modal-bg: #e0f3f1;

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-main);

  position: relative;

  font-family: "Oswald", sans-serif;
`;

export default App;
