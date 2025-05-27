import { useEffect } from "react";
import styled from "styled-components";

import { useStore } from "../contexts/store";
import useDoMove from "../hooks/useDoMove";

import { positionsForWin } from "../utils/utils";

import Tile, { type IconType } from "./Tile";
import Turn from "./Turn";

function Board() {
  const { turn, isGameOver, board, side, setTile, setTurn, setGameOver } =
    useStore();
  const { doMove } = useDoMove();

  // // Перевірка, чи не завершити гру
  useEffect(() => {
    if (board) {
      const boardTypes = board.map((tile) => tile.type);
      const boardPositions = positionsForWin.map((position) =>
        position.map((tileIndex) => boardTypes[tileIndex])
      );

      const isWin = boardPositions.find((position) =>
        position.every((tile) => tile !== null && tile === position[0])
      );

      const isDraw = !boardTypes.includes(null);

      if (isWin) {
        const sideWin = isWin[0];
        setGameOver(`${sideWin} win`);
      } else if (isDraw) {
        setGameOver("Draw");
      }
    }
  }, [board, setGameOver]);

  // Зробити крок
  function handleDoMove({ type, id }: { type: IconType; id: string }) {
    if (type !== null || !side || isGameOver.message || side === "spectate")
      return;

    if (side === turn) {
      const newTurn = turn === "X" ? "O" : "X";
      setTile(id);
      setTurn(newTurn);
      doMove();
    }
  }

  return (
    <Wrapper>
      {board?.map(({ type, id }) => (
        <Tile key={id} icon={type} onClick={() => handleDoMove({ type, id })} />
      ))}
      {turn && <Turn />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80%;
  aspect-ratio: 1/1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: clamp(0.5rem, 11.3vw - 4.5rem, 1rem);
  position: relative;
  z-index: 2;

  @media (max-width: 750px) {
    width: 80%;
    height: revert;
  }

  &:after {
    content: "";
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-primary-darker);
  }
`;

export default Board;
