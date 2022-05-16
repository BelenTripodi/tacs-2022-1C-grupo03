import React, { useState } from "react";
import LoginPage from "./views/auth/LoginPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./views/auth/SignUpPage";
import Dictionary from "./views/dictionary/Dictionary";
import Helper from "./views/helper/Helper";
import Championships from "./views/championship/Championships";
import Dashboard from "./views/dashboard/Dashboard";

import UserContext from "./context/UserContext";
import NotFound from "./components/NotFound";
import Layout from "./components/layout/Layout";

import userService from "./services/user";
import CreateChampionship from "./views/championship/CreateChampionship";
import Score from "./views/championship/Score";
import PublicChampionships from "./views/championship/PublicChampionships";
import MyChampionships from "./views/championship/MyChampionships";
import ChampionshipById from './views/championship/ChampionshipById';

const App = () => {
  const [user, setUser] = useState({ name: "", auth: false });
  const [loading, setLoading] = useState(true);

  if (loading) {
    setLoading(false);
    try {
      setUser({
        name: userService.username(),
        auth: true,
      });
    } catch (err) {
      setUser({
        name: "",
        auth: false,
      });
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
        {user.auth && userService.hasToken() ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/helper" element={<Helper />} />
              <Route path="/championship" element={<Championships />}>
                <Route path="create" element={<CreateChampionship />} />
                <Route path="score" element={<Score />} />
                <Route path="public" element={<PublicChampionships />} />
                <Route path="personal" element={<MyChampionships />} />
                <Route path=":id" element={<ChampionshipById/>} />
              </Route>
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
