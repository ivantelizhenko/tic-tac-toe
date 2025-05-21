import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import GlobalStyles from "./style/GlobalStyles.ts";
import { StoreProvider } from "./contexts/store.tsx";
import SupabaseProvider from "./contexts/SupabaseContext.tsx";
import ReactQueryProvider from "./contexts/ReactQueryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ReactQueryProvider>
        <SupabaseProvider>
          <App />
          <GlobalStyles />
        </SupabaseProvider>
      </ReactQueryProvider>
    </StoreProvider>
  </StrictMode>
);
