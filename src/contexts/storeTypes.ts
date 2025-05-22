export type SideType = "X" | "O";
export type TileType = { type: SideType | null; id: string };
export type GameOverType = "win" | "lose" | "draw";

export type StoreState = {
  side: SideType | null;
  turn: SideType | null;
  board: TileType[] | null;
  isGameOver: { message: string | null };
  userId: string | null;
};

export type StoreContextValue = StoreState & {
  setSide: (side: SideType) => void;
  setBoard: (board: TileType[]) => void;
  setTile: (id: string) => void;
  setGameOver: (message: string) => void;
  setTurn: (turn: SideType) => void;
  setUserId: (userId: string) => void;
};

type SetSideType = {
  type: "side/set";
  payload: SideType;
};

type SetBoardType = {
  type: "board/set";
  payload: TileType[];
};
type SetTileType = {
  type: "tile/set";
  payload: string;
};
type SetGameOverType = {
  type: "gameOver/set";
  payload: string;
};
type SetTurnType = {
  type: "turn/set";
  payload: SideType;
};
type SetUserIdType = {
  type: "userId/set";
  payload: string;
};

export type Action =
  | SetSideType
  | SetBoardType
  | SetTileType
  | SetGameOverType
  | SetTurnType
  | SetUserIdType;
