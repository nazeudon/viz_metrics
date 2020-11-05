import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import MetricsReducer from "../features/metrics/metricsSlice";

export const store = configureStore({
  reducer: {
    metrics: MetricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
