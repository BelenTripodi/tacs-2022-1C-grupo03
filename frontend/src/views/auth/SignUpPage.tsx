import {
    Alert,
    Avatar,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Paper,
} from '@mui/material'
import React, { useState, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import HttpClient from './../../services/client/index'

const SignUpPage = () => {
    let navigate = useNavigate()

    const [username, setUserName] = useState('')

    const [password, setPassword] = useState('')

    const [errors, setError] = useState<string[]>([])

    const addError = (error: string) => {
        setError((prev) => [...prev, error])
    }

    const handleSignUp = () => {
        HttpClient.httpPostWithoutHeaders('/signup', {
            username: username,
            password: password,
        })
            .then((result) => {
                navigate('/login')
            })
            .catch((err) => {
                addError('Error al intentar registrarse')
            })
    }

    const handleKeyStroke = (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key === 'Enter') {
            handleSignUp()
        }
    }

    return (
        <>
            <Grid
                alignItems="center"
                direction="column"
                container
                sx={{ display: 'flex' }}
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
                                src="/img/signup-icon.png"
                                sx={{ width: 72, height: 72 }}
                                variant="rounded"
                            />
                            <h1>Sign Up</h1>
                        </Grid>
                        <Grid item>
                            <h3>Ingrese sus datos para registrarse</h3>
                        </Grid>
                        {errors.map((error, index) => {
                            return (
                                <Alert
                                    severity="error"
                                    key={index}
                                    sx={{ fontWeight: 10 }}
                                >
                                    {error}
                                </Alert>
                            )
                        })}
                        <Grid item margin={2}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="nombreUsuario">
                                    Nombre de Usuario*
                                </InputLabel>
                                <Input
                                    onKeyUp={handleKeyStroke}
                                    name="nombreUsuario"
                                    title="Nombre de usuario"
                                    fullWidth
                                    onChange={(event) =>
                                        setUserName(event.target.value)
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item margin={2}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">
                                    Contraseña*
                                </InputLabel>
                                <Input
                                    onKeyUp={handleKeyStroke}
                                    name="password"
                                    title="Contraseña"
                                    type="password"
                                    fullWidth
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </FormControl>
                        </Grid>

                        <Grid item direction="column" margin={2}>
                            <Button
                                color="primary"
                                variant="outlined"
                                fullWidth
                                onClick={handleSignUp}
                            >
                                Registrarse
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default SignUpPage
