import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  garment_setup: null,
  measurements: null,
  fabrics: null,
  trims: null,
  construction: null,
  artworks: null,
  bom: null,
  artwork_id: null,
  front_logo: null,
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
      state.artwork_id = action.payload;
    },
    setFrontLogo: (state, action) => {
      state.front_logo = action.payload;
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
