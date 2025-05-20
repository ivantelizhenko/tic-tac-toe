import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Action, StoreContextValue, StoreState } from "./storeTypes";

const StoreContext = createContext<StoreContextValue | null>(null);

const initialState: StoreState = {
  test: "",
};

function storeReducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "test": {
      return {
        ...state,
        test: action.payload,
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

function StoreProvider({ children }: { children: ReactNode }) {
  const [appState, dispatch] = useReducer(storeReducer, initialState);

  const ctx: StoreContextValue = {
    ...appState,
    functionExample(test) {
      dispatch({ type: "test", payload: test });
    },
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
