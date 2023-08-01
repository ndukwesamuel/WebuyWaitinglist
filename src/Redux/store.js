import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    console.log("his is working ");
    storage.removeItem("persist:root");
    state = {};
  }
  return reducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
