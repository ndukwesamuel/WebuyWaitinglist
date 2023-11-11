import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import Auth from "./Auth";
import AutenticationSlice from "./AutenticationSlice";
import groupSlice from "./groupSlice";
import ProfileSlice from "./ProfileSlice";
import { walletApi } from "./WalletApi";

const reducers = combineReducers({
  Auth: Auth,
  AutenticationSlice: AutenticationSlice,
  groupSlice: groupSlice,
  ProfileSlice: ProfileSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["Auth"],
};

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    storage.removeItem("persist:root");
    state = {};
  }
  return reducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      walletApi.middleware
    );
  },
});

export const persistor = persistStore(store);
