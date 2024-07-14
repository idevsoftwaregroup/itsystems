import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SystemPage from "./Pages/SystemPage/SystemPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Alert from "./components/common/Alert";
import CreateSystemPage from "./Pages/CreateSystemPage/CreateSystemPage";
import Allsystems from "./Pages/AllSystems/AllSystems";

const App = () => {
  return (
    <Provider store={store}>
      <div
        className="w-screen min-h-[calc(100dvh)] flex justify-center items-center"
        dir="rtl"
      >
        <Alert />
        <BrowserRouter>
          <Routes>
            <Route path="system/:id" element={<SystemPage />} />
            <Route path="not-found" element={<NotFoundPage />} />
            <Route path="create-system" element={<CreateSystemPage />} />
            <Route path="allsystems" element={<Allsystems />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
