import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import GlobalStyles from "./style/GlobalStyles.ts";
import { StoreProvider } from "./contexts/store.tsx";
import SupabaseProvider from "./contexts/SupabaseContext.tsx";
import ReactQueryProvider from "./contexts/ReactQueryContext.tsx";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ReactQueryProvider>
        <SupabaseProvider>
          <App />
          <GlobalStyles />
          <Toaster
            containerStyle={{
              zIndex: 999999999, // щось супер-високе
              position: "fixed", // обов'язково
            }}
            toastOptions={{
              style: {
                zIndex: 999999999,
              },
            }}
          />
        </SupabaseProvider>
      </ReactQueryProvider>
    </StoreProvider>
  </StrictMode>
);
