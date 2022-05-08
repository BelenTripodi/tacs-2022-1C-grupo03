import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box sx={{ display: "flex", width: "auto" }}>
      <ButtonGroup orientation={"vertical"} fullWidth={true}>
        {/** muestra los torneos a los que te uniste.
           - un switch en la ui para filtrar por privado o publico
           - que pasa con los torneos que terminaron?
         **/}
        <Link to={"personal"} style={{ textDecoration: "none" }}>
          <Button>Mis Torneos</Button>
        </Link>
        {/** muestra los torneos publicos y un boton en cada uno para unirte, si no empezó.
           - no mostrar torneos demasiado viejos, hay que pensar un criterio
         **/}
        {/** Listado de torneos (igual para Mis Torneos y Torneos Públicos.
           - hacerles click abre un modal con la info del torneo (tabla posiciones que pide la user story y más)
           - paginados
         **/}
        <Link to={"public"} style={{ textDecoration: "none" }}>
          <Button>Torneos Públicos</Button>
        </Link>
        {/** cargar en español y/o inglés, validar por hora **/}
        <Link to={"score"} style={{ textDecoration: "none" }}>
          <Button>Cargar mis resultados</Button>
        </Link>
        <Link to={"create"} style={{ textDecoration: "none" }}>
          <Button>Crear torneo</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
}
