import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import apiMetricsData from "./apiMetricsData.json";

type METRICSDATA = typeof apiMetricsData;

type metricsState = {
  metrics: METRICSDATA; //全体
  classId: number; //選択されているクラスID
  precisions: number[]; //選択されているクラスIDの要素
  recalls: number[]; //選択されているクラスIDの要素
  f1s: number[]; //選択されているクラスIDの要素
  confidences: number[]; //選択されているクラスIDの要素
  precision: number; //一つの要素
  recall: number;
  f1: number;
  confidence: number;
};

const initialState: metricsState = {
  metrics: apiMetricsData,
  classId: 0,
  precisions: [0],
  recalls: [0],
  f1s: [0],
  confidences: [0],
  precision: 0,
  recall: 0,
  f1: 0,
  confidence: 0,
};

const fetchAsyncGetMetrics = createAsyncThunk(
  "metrics/drop",
  async (metrics: METRICSDATA) => {
    return metrics;
  }
);

const metricsSlice = createSlice({
  name: "metrics",
  initialState: initialState,
  reducers: {
    fetchDetermineClassID(state, action) {
      // action.payload == classID: ex. 0
      state.classId = action.payload;
    },
    fetchDeterminePrecision(state) {
      //classIDの要素に絞る
      const bools = state.metrics.classIds.map((id) => id === state.classId);
      state.precisions = state.metrics.precisions.filter((pre, i) =>
        bools[i] ? pre : null
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMetrics.fulfilled, (state, action) => {
      return {
        ...state,
        metrics: action.payload,
      };
    });
  },
});

export const selectMetrics = (state: RootState) => state.metrics.metrics;
export const selectClassID = (state: RootState) => state.metrics.classId;
export const selectPrecision = (state: RootState) => state.metrics.precision;
export const selectRecall = (state: RootState) => state.metrics.recall;
export const selectF1 = (state: RootState) => state.metrics.f1;
export const selectConfidence = (state: RootState) => state.metrics.confidence;

export default metricsSlice.reducer;
