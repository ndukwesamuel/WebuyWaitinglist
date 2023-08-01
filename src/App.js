// import React from "react";
// import WaitingList from "./Page/WaitingList";

// function App() {
//   return (
//     <div>
//       <WaitingList />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageRoutes from "./Page/PageRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import './main.scss';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/*" exact element={<PageRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
