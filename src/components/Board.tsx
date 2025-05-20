import styled from "styled-components";
import Tile, { type IconType } from "./Tile";

const tiles: { type: IconType; id: string }[] = [
  { type: null, id: "asnnvhf" },
  { type: "X", id: "asnn2vhf" },
  { type: "X", id: "asnn3vhf" },
  { type: "X", id: "asnnv5hf" },
  { type: "O", id: "asnn4vhf" },
  { type: null, id: "asnn6vhf" },
  { type: null, id: "7asnnvhf" },
  { type: null, id: "asn8nvhf" },
  { type: null, id: "asn1nvhf" },
];

function Board() {
  return (
    <Wrapper>
      {tiles.map(({ type, id }) => (
        <Tile key={id} icon={type} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50%;
  aspect-ratio: 1/1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  position: relative;
  z-index: 2;

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
