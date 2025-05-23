import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GameEnviroment from "./components/GameEnvironment";
import Menu from "./components/Menu";

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/game/:gameId" element={<GameEnviroment />} />
          <Route path="*" element={<Navigate replace to="/menu" />} />
        </Routes>
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
  --color-white: #f2ecd2;
  --color-gray: #545453;
  --color-disabled: #ccc;

  background-color: var(--color-primary);
  height: 100%;
  display: grid;

  font-family: "Oswald", sans-serif;
`;

export default App;
