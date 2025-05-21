import styled from "styled-components";
import Board from "./components/Board";
import { useEffect } from "react";
import { getIdFromLocalStorage, setIdToLocalStorage } from "./utils/helpers";
import { useStore } from "./contexts/store";

function App() {
  const { setUserId } = useStore();

  useEffect(() => {
    const localStorageId = getIdFromLocalStorage();

    if (localStorageId) {
      setUserId(localStorageId);
    } else {
      const id = Math.random().toString();
      setUserId(id);
      setIdToLocalStorage(id);
    }
  }, [setUserId]);

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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-main);

  position: relative;

  font-family: "Oswald", sans-serif;
`;

export default App;
