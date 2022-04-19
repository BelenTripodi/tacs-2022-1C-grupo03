import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";

const LoginPage = () => {
  return (
    <>
      <Grid
        alignItems="center"
        direction="column"
        container
        xs={4}
        xl={4}
        md={4}
        border={1}
        padding={2}
        borderColor="lightblue"
      >
        <Grid item lg="auto">
          <h1>Sign In</h1>
        </Grid>
        <Grid item lg="auto" alignContent="center" container direction="column">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-lock"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#00abfb"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
          </svg>
        </Grid>
        <Grid item lg="auto">
          <p>Ingrese sus datos para ingresar</p>
        </Grid>
        <Grid item margin={2}>
          <FormControl>
            <InputLabel htmlFor="nombreUsuario">Nombre de Usuario</InputLabel>
            <Input name="nombreUsuario" title="Nombre de usuario" />
          </FormControl>
        </Grid>
        <Grid item margin={2}>
          <FormControl>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input name="password" title="Contraseña" />
          </FormControl>
        </Grid>
        <Grid item direction="row">
        <Grid item xs={6} direction="column" margin={2}>
          <Button type="submit" color="primary" variant="outlined" >
            LogIn
          </Button>
        </Grid>
        <Grid item xs={6} direction="column" margin={2}>
          <Button color="secondary" variant="outlined">
            <Link to="/signup">
            Registrarse
            </Link>
          </Button>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
