import { useEffect } from "react";
import styled from "styled-components";

import { possibleWin } from "../utils/utils";
import { useStore } from "../contexts/store";

import useUpdateBoard from "../hooks/useUpdateBoard";
import Tile, { type IconType } from "./Tile";
import O from "./O";
import X from "./X";

function Board() {
  const { turn, board, isGameOver, setTile, setGameOver, side, setTurn } =
    useStore();
  const { updateBoard } = useUpdateBoard();

  // Перевірка, чи не завершити гру
  useEffect(() => {
    if (board) {
      const boardNumber = board.map((tile) => tile.type);
      const positionsForWins = possibleWin.map((set) =>
        set.map((index) => boardNumber[index])
      );
      const isWin = positionsForWins.find((positionForWin) => {
        const set = Array.from(new Set(positionForWin));
        return !set.includes(null) && set.length === 1;
      });

      const isDraw = !board.map((tile) => tile.type).includes(null);

      if (isWin) {
        const sideWin = isWin[0];
        setGameOver(`${sideWin} win`);
      } else if (isDraw) {
        setGameOver("Draw");
      }
    }
  }, [board, setGameOver, updateBoard]);

  // Зробити крок
  function handleDoMove({ type, id }: { type: IconType; id: string }) {
    if (type || isGameOver.message || !side || side === "spectate") return;

    if (side === turn) {
      const newTurn = turn === "X" ? "O" : "X";
      setTile(id);
      setTurn(newTurn);
      updateBoard();
    }
  }

  return (
    <Wrapper>
      {board?.map(({ type, id }) => (
        <Tile key={id} icon={type} onClick={() => handleDoMove({ type, id })} />
      ))}
      {turn && <Turn $isO={turn === "O"}>{turn === "O" ? <O /> : <X />}</Turn>}
    </Wrapper>
  );
}

const Turn = styled.p<{ $isO: boolean }>`
  position: absolute;
  left: 0;
  top: -10%;
  color: ${({ $isO }) => ($isO ? "var(--color-o)" : "var(--color-x)")};
  width: 40px;

  @media (max-width: 750px) {
    top: -20%;
    width: 30px;
  }
`;

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
    background-color: var(--color-main-darker);
  }
`;

export default Board;
