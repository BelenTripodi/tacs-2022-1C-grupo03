import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import Box from "@mui/material/Box";

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
      <Sidebar></Sidebar>
      <Box sx={{ display: "flex", marginLeft: "10px", width: "auto" }}>
        LALAL
      </Box>
    </div>
  );
};

export default Championship;
