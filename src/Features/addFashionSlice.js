import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  garment_setup: null,
  measurements: null,
  fabrics: null,
  trims: null,
  construction: null,
  artworks: null,
  bom: null,
};

const addFashionSlice = createSlice({
  name: "addFashion",
  initialState,
  reducers: {
    setGarmentSetup: (state, action) => {
      state.garment_setup = action.payload;
    },
    setMeasurementsData: (state, action) => {
      state.measurements = action.payload;
    },
    setFabricsData: (state, action) => {
      state.fabrics = action.payload;
    },
    setTrimsData: (state, action) => {
      state.trims = action.payload;
    },
    setConstruction: (state, action) => {
      state.construction = action.payload;
    },
    setArtworksData: (state, action) => {
      state.artworks = action.payload;
    },
    setBom: (state, action) => {
      state.bom = action.payload;
    },
    setArtworkId: (state, action) => {
      console.log(action.payload);
      // state.artwork_id = action.payload;
      // state[action.payload.name] = action.payload.value;
    },
  },
});

export const {
  setGarmentSetup,
  setMeasurementsData,
  setFabricsData,
  setTrimsData,
  setConstruction,
  setArtworksData,
  setBom,
  setArtworkId,
  setFrontLogo,
} = addFashionSlice.actions;
export default addFashionSlice.reducer;
