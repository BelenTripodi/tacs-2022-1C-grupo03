import React from "react";
import LoginPage from "./views/auth/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./views/auth/SignUpPage";
import Navbar from "./components/layout/Navbar";
import Dictionary from "./views/dictionary/Dictionary";
import Helper from "./views/helper/Helper";
import Championship from "./views/championship/Championship";
import Dashboard from "./views/dashboard/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/championship" element={<Championship />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
