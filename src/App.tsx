import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";

const Menu = lazy(() => import("./pages/Menu"));
const GameEnvironment = lazy(() => import("./pages/GameEnvironment"));

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/game/:gameId" element={<GameEnvironment />} />
            <Route path="*" element={<Navigate replace to="/menu" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  --color-primary: #18bdac;
  --color-primary-hover: #16b1a4;
  --color-primary-darker: #0ca192;
  --color-primary-lighter: #50d3c4;
  --color-surface: #e0f3f1;
  --color-surface-hover: #cbe6e3;
  --color-white: #f2ecd2;
  --color-gray: #545453;
  --color-disabled: #ccc;

  background-color: var(--color-primary);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Oswald", sans-serif;
`;

export default App;
