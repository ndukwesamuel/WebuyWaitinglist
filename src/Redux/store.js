import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import Auth from "./Auth";
import AuthenticationSlice from "./AuthenticationSlice";
import groupSlice from "./groupSlice";
import ProfileSlice from "./ProfileSlice";
import { walletApi } from "./WalletApi";
import { orderApi } from "./orderApi";
import { passwordResetApi } from "./PasswordResetApi";
import ProductSlice from "./ProductSlice";
import OrderSlice from "./OrderSlice";

const reducers = combineReducers({
  Auth: Auth,
  AuthenticationSlice: AuthenticationSlice,
  groupSlice: groupSlice,
  ProfileSlice: ProfileSlice,
  ProductSlice: ProductSlice,
  OrderSlice: OrderSlice,
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
    [passwordResetApi.reducerPath]: passwordResetApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      walletApi.middleware,
      passwordResetApi.middleware,
      orderApi.middleware
    );
  },
  passwordResetApi,
});

export const persistor = persistStore(store);
