import styled from "styled-components";
import Board from "./components/Board";

function App() {
  return (
    <Wrapper>
      <Board />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  --color-main: #18bdac;
  --color-x: #545453;
  --color-o: #f2ecd2;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-main);
`;

export default App;
