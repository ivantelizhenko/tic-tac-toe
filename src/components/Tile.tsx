import styled from "styled-components";
import X from "./X";
import O from "./O";

export type IconType = "X" | "O" | null;
type TileProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType;
};

function Tile({ icon, ...delegated }: TileProps) {
  const Icon = { X, O }[icon!];
  return <Wrapper {...delegated}>{icon && <Icon />}</Wrapper>;
}

const Wrapper = styled.button`
  display: grid;
  place-content: center;
  width: 100%;

  font-size: 8rem;
  border: none;
  cursor: default;
  background-color: var(--color-primary);
  padding: 12px;
`;

export default Tile;
