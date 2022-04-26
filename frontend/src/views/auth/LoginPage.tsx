import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import { Paper } from "@mui/material";

import UserContext from "../../context/UserContext";

import httpClient from "../../services/client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const LoginPage = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState<string[]>([]);

  const { user, login, logout } = useContext(UserContext);

  const MySwal = withReactContent(Swal);

  const addError = (error: string) => {
    setError((prev) => [...prev, error]);
  };

  const handleLogin = () => {
    httpClient
      .post("/login", {
        username: name,
        password: password,
      })
      .then((result) => {
        login(name, result.data.data.jwt);
        navigate("/");
      })
      .catch((err) => {
        addError("Error al internat iniciar sesión");
      });
  };

  return (
    <>
      <Grid
        alignItems="center"
        direction="column"
        container
        sx={{ display: "flex"}}
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
              <Avatar
                src="/img/login-icon.png"
                sx={{ width: 72, height: 72 }}
              />
              <h1>Sign In</h1>
              <h3>Ingresar a la App</h3>
              {errors.map((error,index) => {
                return (
                <Alert severity="error" key={index} sx={{fontWeight: 10 }}>
                  {error}
                </Alert>
                );
              })}
            </Grid>
            <Grid item margin={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="nombreUsuario">
                  Nombre de Usuario*
                </InputLabel>
                <Input
                  name="nombreUsuario"
                  title="Nombre de usuario"
                  onChange={(event) => setName(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item margin={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Contraseña*</InputLabel>
                <Input
                  name="password"
                  title="Contraseña"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item direction="row" sx={{ display: "flex" }}>
              <Grid item xs={12} direction="column" margin={2}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  onClick={handleLogin}
                  fullWidth
                >
                  LogIn
                </Button>
              </Grid>
            </Grid>
            <Grid item direction="row" sx={{ display: "flex" }}>
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
      {/* {
        errors.length > 0 && MySwal.fire({
          title: "Error",
          text: errors[0]
        }).then(() => {
          navigate("/");
        })
      } */}
    </>
  );
};

export default LoginPage;
