import React, { useContext, useState } from "react";
import LoginPage from "./views/auth/LoginPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./views/auth/SignUpPage";
import Navbar from "./components/layout/Navbar";
import Dictionary from "./views/dictionary/Dictionary";
import Helper from "./views/helper/Helper";
import Championship from "./views/championship/Championship";
import Dashboard from "./views/dashboard/Dashboard";

import UserProvider from "./context/UserProvider";

import UserContext from "./context/UserContext";
import NotFound from "./components/NotFound";
import Layout from "./components/layout/Layout";

const App = () => {
  const [user, setUser] = useState({ name: "", auth: false });

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          login: (name: string,jwt: string) => {
            console.log("Por settear");
            console.log(jwt);

            localStorage.setItem("jwt",jwt);

            setUser({ name: name, auth: true });
          },
          logout: () => {
            setUser({ name: "", auth: false });
            localStorage.removeItem("jwt");
          },
        }}
      >
        {user.auth ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/helper" element={<Helper />} />
              <Route path="/championship" element={<Championship />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
