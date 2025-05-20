import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import GlobalStyles from "./style/GlobalStyles.ts";
import { StoreProvider } from "./contexts/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
    <GlobalStyles />
  </StrictMode>
);
