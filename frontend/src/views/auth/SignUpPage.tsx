import { Avatar, Button, Container, FormControl, Grid, Input, InputLabel, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
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
                <Avatar src="/img/signup-icon.png" sx={{width: 72,height: 72}} variant="rounded"/>
                <h1>Sign Up</h1>
              </Grid>
              <Grid item>
                <h3>Ingrese sus datos para registrarse</h3>
              </Grid>
              <Grid item margin={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="nombreUsuario">
                    Nombre de Usuario*
                  </InputLabel>
                  <Input name="nombreUsuario" title="Nombre de usuario" fullWidth/>
                </FormControl>
              </Grid>
              <Grid item margin={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">Contraseña*</InputLabel>
                  <Input name="password" title="Contraseña" type="password" fullWidth/>
                </FormControl>
              </Grid>
             
                <Grid item direction="column" margin={2}>
                  <Button color="primary" variant="outlined" fullWidth>
                      Registrarse
                    </Button>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </>
  );
};

export default SignUpPage;
