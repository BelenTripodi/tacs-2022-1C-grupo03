import React from "react";
import "./App.css";
import LoginPage from "./components/auth/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/auth/SignUpPage";
import { Grid } from "@mui/material";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Grid
        alignItems="center"
        direction="column"
        justifyContent="center"
        container
        padding={2}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </>
  );
}

export default App;
