import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type {
  Action,
  SideType,
  StoreContextValue,
  StoreState,
} from "./storeTypes";

const StoreContext = createContext<StoreContextValue | null>(null);

const initialState: StoreState = {
  side: null,
  turn: null,
  board: null,
  isGameOver: { message: null },
  userId: null,
};

function storeReducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "side/set": {
      return {
        ...state,
        side: action.payload,
      };
    }
    case "board/set": {
      return {
        ...state,
        board: action.payload,
      };
    }
    case "tile/set": {
      const newBoard = state.board!.map((tile) =>
        tile.id === action.payload
          ? { type: state.side as SideType, id: action.payload }
          : tile
      );
      return {
        ...state,
        board: newBoard,
      };
    }
    case "gameOver/set": {
      return { ...state, isGameOver: { message: action.payload } };
    }
    case "game/reset": {
      return { ...state, isGameOver: { message: null }, side: null };
    }
    case "turn/set": {
      return { ...state, turn: action.payload };
    }
    case "userId/set": {
      return { ...state, userId: action.payload };
    }
    default:
      throw new Error("Unknown action type");
  }
}

function StoreProvider({ children }: { children: ReactNode }) {
  const [appState, dispatch] = useReducer(storeReducer, initialState);

  const ctx: StoreContextValue = {
    ...appState,
    setSide: useCallback((side) => {
      dispatch({ type: "side/set", payload: side });
    }, []),
    setBoard: useCallback((board) => {
      dispatch({ type: "board/set", payload: board });
    }, []),
    setTile(id) {
      dispatch({ type: "tile/set", payload: id });
    },
    setGameOver: useCallback((message) => {
      dispatch({ type: "gameOver/set", payload: message });
    }, []),
    reset: () => {
      dispatch({ type: "game/reset" });
    },
    setTurn: useCallback((turn) => {
      dispatch({ type: "turn/set", payload: turn });
    }, []),
    setUserId: useCallback((id: string) => {
      dispatch({ type: "userId/set", payload: id });
    }, []),
  };

  return <StoreContext.Provider value={ctx}>{children}</StoreContext.Provider>;
}

function useStore() {
  const context = useContext(StoreContext);

  if (context === undefined)
    throw new Error(
      "StoreContext was used outside of the StoreContextProvider"
    );

  return context as StoreContextValue;
}

export { StoreProvider, useStore };
