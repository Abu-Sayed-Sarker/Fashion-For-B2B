import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import addFashionReducer from "../Features/addFashionSlice";
import progressReducer from "../Features/progressSlice";
import storage from "redux-persist/lib/storage";
import { api } from "../Api/api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["addFashion", "progress"],
};
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  addFashion: addFashionReducer,
  progress: progressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: [
          "register",
          "rehydrate",
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
        ],
      },
    }).concat(api.middleware),
});

export const parsistor = persistStore(store);
