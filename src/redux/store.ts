import type { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

export const store = configureStore({
  reducer: slice.reducer,
  devTools: import.meta.env.DEV,
});

export type AppReduxDispatch = typeof store.dispatch;
export type AppReduxStore = ReturnType<typeof store.getState>;
export type ThunkState = {
  state: AppReduxStore;
  dispatch: AppReduxDispatch;
};

export const useAppDispatch: () => AppReduxDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppReduxStore> = useSelector;
