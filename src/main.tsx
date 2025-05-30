import { configureStore } from "@reduxjs/toolkit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { LangReducer } from "./langContext/redux";
import { ATHOSDynamicTableProvider } from "./module-index";
import { PageReducer } from "./pageContext/redux";
import AppRoutes from "./Routes";
import { RoutesProvider } from "./Routes/routes";
import { ThemeReducer } from "./themeContext/redux";

const AppStore = configureStore({
  reducer: {
    ThemeReducer,
    LangReducer,
    PageReducer,
  },
});
export type AppState = ReturnType<typeof AppStore.getState>;

const Index = () => {
  return (
    <Provider store={AppStore}>
      <ATHOSDynamicTableProvider>
        <RoutesProvider>
          <AppRoutes />
        </RoutesProvider>
      </ATHOSDynamicTableProvider>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
