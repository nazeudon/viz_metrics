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
  recall: number; //一つの要素
  f1: number; //一つの要素
  confidence: number; //一つの要素
  index: number;
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
  confidence: 0.5,
  index: 0,
};

export const fetchAsyncGetMetrics = createAsyncThunk(
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
      state.classId = parseInt(action.payload);
    },
    fetchDeterminePrecisions(state) {
      //classIDの要素に絞る
      const bools = state.metrics.classIds.map((id) => id === state.classId);
      state.precisions = state.metrics.precisions.filter((pre, i) =>
        bools[i] ? pre : null
      );
    },
    fetchDetermineRecalls(state) {
      //classIDの要素に絞る
      const bools = state.metrics.classIds.map((id) => id === state.classId);
      state.recalls = state.metrics.recalls.filter((rec, i) =>
        bools[i] ? rec : null
      );
    },
    fetchDetermineF1s(state) {
      //classIDの要素に絞る
      const bools = state.metrics.classIds.map((id) => id === state.classId);
      state.f1s = state.metrics.f1s.filter((f1, i) => (bools[i] ? f1 : null));
    },
    fetchDetermineConfidences(state) {
      //classIDの要素に絞る
      const bools = state.metrics.classIds.map((id) => id === state.classId);
      state.confidences = state.metrics.confidences.filter((conf, i) =>
        bools[i] ? conf : null
      );
    },
    fetchExtractPrecision(state, action) {
      //1つの要素を抽出する
      //action.payload = index: ex. 1
      state.precision =
        state.precisions.length && action.payload >= 0
          ? state.precisions[action.payload]
          : 0;
    },
    fetchExtractRecall(state, action) {
      //1つの要素を抽出する
      //action.payload = index: ex. 1
      state.recall =
        state.recalls.length && action.payload >= 0
          ? state.recalls[action.payload]
          : 0;
    },
    fetchExtractF1(state, action) {
      //1つの要素を抽出する
      //action.payload = index: ex. 1
      state.f1 =
        state.f1s.length && action.payload >= 0 ? state.f1s[action.payload] : 0;
    },
    fetchExtractConfidence(state, action) {
      state.confidence = action.payload;
    },
    fetchExtractIndex(state) {
      const isLargeNumber = (element: number) => element < state.confidence;
      state.index = state.confidences.findIndex(isLargeNumber) - 1;
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

export const {
  fetchDetermineClassID,
  fetchDeterminePrecisions,
  fetchDetermineRecalls,
  fetchDetermineF1s,
  fetchDetermineConfidences,
  fetchExtractPrecision,
  fetchExtractRecall,
  fetchExtractF1,
  fetchExtractConfidence,
  fetchExtractIndex,
} = metricsSlice.actions;

export const selectMetrics = (state: RootState) => state.metrics.metrics;
export const selectClassIDs = (state: RootState) =>
  state.metrics.metrics.classIds;
export const selectClassID = (state: RootState) => state.metrics.classId;

export const selectPrecisions = (state: RootState) => state.metrics.precisions;
export const selectRecalls = (state: RootState) => state.metrics.recalls;
export const selectF1s = (state: RootState) => state.metrics.f1s;
export const selectConfidences = (state: RootState) =>
  state.metrics.confidences;

export const selectPrecision = (state: RootState) => state.metrics.precision;
export const selectRecall = (state: RootState) => state.metrics.recall;
export const selectF1 = (state: RootState) => state.metrics.f1;
export const selectConfidence = (state: RootState) => state.metrics.confidence;

export const selectIndex = (state: RootState) => state.metrics.index;

export default metricsSlice.reducer;
