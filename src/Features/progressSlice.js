import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetProgress: () => initialState,
  },
});

export const { setCurrentStep, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
