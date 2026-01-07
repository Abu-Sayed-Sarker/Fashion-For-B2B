import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

const addFashionSlice = createSlice({
  name: "addFashion",
  initialState,
  reducers: {
    setFashionId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setFashionId } = addFashionSlice.actions;
export default addFashionSlice.reducer;
