// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import authReducer from "../Controllers/authSlice";
import { api } from "@/Apis/api";

// Only run client-specific storage logic on the client
const createNodeStorage = () => {
  return {
    getItem: (_key) => {
      return Promise.resolve(null);
    },
    setItem: (_key, item) => {
      return Promise.resolve(item);
    },
    removeItem: (_key) => {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNodeStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: [
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
        ],
      },
    }).concat(api.middleware),
});

export const persister = persistStore(store);
