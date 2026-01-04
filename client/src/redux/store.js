import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

/* ================= ROOT REDUCER ================= */

const rootReducer = combineReducers({
  user: userReducer,
});

/* ================= PERSIST CONFIG ================= */

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // ✅ persist ONLY user data
};

/* ================= PERSISTED REDUCER ================= */

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

/* ================= STORE ================= */

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // REQUIRED for redux-persist
    }),
});

/* ================= PERSISTOR ================= */

export const persistor = persistStore(store);
