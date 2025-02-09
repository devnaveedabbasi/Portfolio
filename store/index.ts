import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "@/store/slices/colorSlice/colorSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      color: colorSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
