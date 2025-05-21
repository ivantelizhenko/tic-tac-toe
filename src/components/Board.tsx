import styled from "styled-components";
import Tile, { type IconType } from "./Tile";
import { useStore } from "../contexts/store";
import { createBoard, possibleWin } from "../utils/utils";
import { useEffect } from "react";

function Board() {
  const { side, board, isGameOver, setBoard, setTile, setSide, setGameOver } =
    useStore();

  useEffect(() => {
    setBoard(createBoard());
    setSide("X");
  }, [setBoard, setSide]);

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

      if (isWin) {
        const sideWin = isWin[0];
        setGameOver({ type: "win", message: `${sideWin} win.` });
      }
    }
  }, [board, setGameOver]);

  function handleDoMove({ type, id }: { type: IconType; id: string }) {
    if (type || isGameOver.type) return;
    setTile(id);

    // Temporary:
    const newSide = side === "X" ? "O" : "X";
    setSide(newSide);
  }

  if (!board) return <p>Spinner</p>;

  return (
    <Wrapper>
      {board.map(({ type, id }) => (
        <Tile key={id} icon={type} onClick={() => handleDoMove({ type, id })} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80%;
  aspect-ratio: 1/1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
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
    background-color: #0ca192;
  }
`;

export default Board;
