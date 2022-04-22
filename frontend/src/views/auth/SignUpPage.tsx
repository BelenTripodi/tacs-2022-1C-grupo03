import { Avatar, Button, FormControl, Grid, Input, InputLabel, Paper } from "@mui/material";
import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from './../../context/UserContext';

const SignUpPage = () => {

  const { login } = useContext(UserContext);

  let navigate = useNavigate();

  const [username,setUserName] = useState("");

  const [password,setPassword] = useState("");


  const handleSignUp = () => {
    // TODO Conectarse con la API acá

    login(username);

    navigate("/");
  };

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
                  <Input name="nombreUsuario" title="Nombre de usuario" fullWidth onChange={(event) => setUserName(event.target.value)}/>
                </FormControl>
              </Grid>
              <Grid item margin={2}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">Contraseña*</InputLabel>
                  <Input name="password" title="Contraseña" type="password" fullWidth onChange={(event) => setPassword(event.target.value)}/>
                </FormControl>
              </Grid>
             
                <Grid item direction="column" margin={2}>
                  <Button color="primary" variant="outlined" fullWidth onClick={handleSignUp}>
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
