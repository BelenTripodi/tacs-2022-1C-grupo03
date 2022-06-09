import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box sx={{ display: "flex", width: "auto" }}>
      <ButtonGroup orientation={"vertical"} fullWidth={true}>
        <Link
          to={"personal"}
          style={{
            textDecoration: "none",
            marginBottom: "10px",
          }}
        >
          <Button style={{ height: "50px" }}>Mis Torneos</Button>
        </Link>
        <Link
          to={"public"}
          style={{ textDecoration: "none", marginBottom: "10px" }}
        >
          <Button style={{ height: "50px" }}>Torneos Públicos</Button>
        </Link>
        <Link
          to={"score"}
          style={{ textDecoration: "none", marginBottom: "10px" }}
        >
          <Button style={{ height: "50px" }}>Cargar mis resultados</Button>
        </Link>
        <Link to={"create"} style={{ textDecoration: "none" }}>
          <Button style={{ height: "50px" }}>Crear torneo</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
}
