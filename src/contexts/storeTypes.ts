export type StoreState = {
  test: string;
};

export type StoreContextValue = StoreState & {
  functionExample: (test: string) => void;
};

type FunctionExampleType = {
  type: "test";
  payload: string;
};

export type Action = FunctionExampleType;
