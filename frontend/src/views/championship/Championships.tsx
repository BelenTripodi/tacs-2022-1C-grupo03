import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const Championships = () => {
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
      <Box sx={{ marginLeft: "10px", width: "100%" }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Championships;
