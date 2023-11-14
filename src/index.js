import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// import { persistor, store } from "./Slice/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
// import store, { persistor } from "./Redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
