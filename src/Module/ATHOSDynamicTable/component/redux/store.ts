import { configureStore } from "@reduxjs/toolkit";
import ADTCustomStatesReducer from "./CustomStates/provider";
import ADTFilteringReducer from "./Filtering/provider";
import ADTSelectReducer from "./Select/provider";

const ADTStore = configureStore({
  reducer: {
    ADTCustomStatesReducer,
    ADTSelectReducer,
    ADTFilteringReducer,
  },
});

export type ADTState = ReturnType<typeof ADTStore.getState>;
export type ADTDispatch = typeof ADTStore.dispatch;
