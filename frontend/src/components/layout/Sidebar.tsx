import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup } from "@mui/material";

export default function Sidebar() {
  return (
    <Box sx={{ display: "flex", width: "auto" }}>
      <ButtonGroup orientation={"vertical"} fullWidth={true}>
        <Button>Mis Torneos</Button>
        <Button>Unirme a un torneo</Button>
        <Button>Cargar mis resultados</Button>
        <Button>Crear torneo</Button>
      </ButtonGroup>
    </Box>
  );
}
