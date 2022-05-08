import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const Championship = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "10px",
        height: "100%",
      }}
    >
      <Sidebar />
      <Box sx={{ display: "flex", marginLeft: "10px", width: "auto" }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Championship;
