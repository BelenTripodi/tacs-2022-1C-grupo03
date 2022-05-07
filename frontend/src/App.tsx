import React, { useState } from "react";
import LoginPage from "./views/auth/LoginPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./views/auth/SignUpPage";
import Dictionary from "./views/dictionary/Dictionary";
import Helper from "./views/helper/Helper";
import Championship from "./views/championship/Championship";
import Dashboard from "./views/dashboard/Dashboard";

import UserContext from "./context/UserContext";
import NotFound from "./components/NotFound";
import Layout from "./components/layout/Layout";

import userService from "./services/user";

const App = () => {
  const [user, setUser] = useState({ name: "", auth: false });
  const [loading, setLoading] = useState(true);
  
    if(loading){
      setLoading(false);
      try{
        setUser({
          name: userService.username(),
          auth: true
        })
      }catch(err){
        setUser({
          name: "",
          auth: false
        })
      }
    }
  
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          login: (name: string, jwt: string) => {
            localStorage.setItem("jwt", jwt);
            setUser({ name: name, auth: true });
          },
          logout: () => {
            localStorage.removeItem("jwt");
            setUser({ name: "", auth: false });
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
