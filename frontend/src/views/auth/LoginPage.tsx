import React, { Fragment, useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Avatar, Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { Paper } from "@mui/material";

import UserContext from "../../context/UserContext";

const LoginPage = () => {

  let navigate = useNavigate();

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");

  const { user, login, logout } = useContext(UserContext);

  const handleLogin = () => {
    // TODO Conectarse con la API

    login(name);

    console.log(user);

   navigate("/");
  }

  return (
    <>
      <Grid
        alignItems="center"
        direction="column"
        container
        sx={{ display: "flex" }}
        padding={2}
      >
        <Paper>
          <Grid margin={2}>
            
            <Grid
              item
              lg="auto"
              alignContent="center"
              container
              direction="column"
            >
              <Avatar src="/img/login-icon.png" sx={{width: 72,height: 72}} />
              <h1>Sign In</h1>
              <h3>Ingresar a la App</h3>
            </Grid>
            <Grid item margin={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="nombreUsuario">
                  Nombre de Usuario*
                </InputLabel>
                <Input name="nombreUsuario" title="Nombre de usuario" onChange={(event) => setName(event.target.value)}/>
              </FormControl>
            </Grid>
            <Grid item margin={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Contraseña*</InputLabel>
                <Input name="password" title="Contraseña" type="password" onChange={(event) => setPassword(event.target.value)} fullWidth/>
              </FormControl>
            </Grid>
            <Grid item direction="row" sx={{ display: "flex" }}>
              <Grid item xs={12} direction="column" margin={2}>
                <Button type="submit" color="primary" variant="outlined" onClick={handleLogin} fullWidth>
                  LogIn
                </Button>
              </Grid>
            </Grid>
              <Grid item direction="row" sx={{display: "flex"}}>
              <Grid item xs={8} direction="column">
                <p>Aún no tienes una cuenta?</p>  
              </Grid>
              <Grid item xs={4} direction="column" margin={2}>
                <Link to="/signup">Registrarse</Link>
              </Grid>
              </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default LoginPage;
