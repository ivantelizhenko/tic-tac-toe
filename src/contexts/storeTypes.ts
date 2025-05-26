export type SideType = "X" | "O";
export type TileType = { type: SideType | null; id: string };
export type GameOverType = "win" | "draw";

export type StoreState = {
  side: SideType | null | "spectate";
  turn: SideType | null;
  board: TileType[] | null;
  isGameOver: { message: string | null };
  userId: string | null;
  gameId: string | null;
};

export type StoreContextValue = StoreState & {
  setSide: (side: SideType | "spectate") => void;
  setBoard: (board: TileType[]) => void;
  setTile: (id: string) => void;
  setGameOver: (message: string) => void;
  reset: () => void;
  setTurn: (turn: SideType) => void;
  setUserId: (userId: string) => void;
  setGameId: (gameId: string) => void;
};

type SetSideType = {
  type: "side/set";
  payload: SideType | "spectate";
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
type GameResetType = {
  type: "game/reset";
};
type SetTurnType = {
  type: "turn/set";
  payload: SideType;
};
type SetUserIdType = {
  type: "userId/set";
  payload: string;
};
type SetGameIdType = {
  type: "gameId/set";
  payload: string;
};

export type Action =
  | SetSideType
  | SetBoardType
  | SetTileType
  | SetGameOverType
  | GameResetType
  | SetTurnType
  | SetUserIdType
  | SetGameIdType;
