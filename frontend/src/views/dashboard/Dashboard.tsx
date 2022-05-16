import {
    Button,
    Container,
    Grid,
    Typography,
    CardActionArea,
    CardActions,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const cardSize = {
    minWidth: '200px',
    maxWidth: '400px',
}

const Dashboard = () => {
    const [spacing, setSpacing] = React.useState(2)
    const navigate = useNavigate()

    return (
        <>
            <Grid sx={{ flexGrow: 1, marginTop: '2rem' }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent="space-around"
                        spacing={spacing}
                    >
                        {/* Modo torneo */}
                        <Card sx={cardSize}>
                            <CardActionArea
                                onClick={() => navigate('/championship/public')}
                            >
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image="/img/cup.jpeg"
                                    alt="Cup image"
                                    sx={cardSize}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Modo Torneo
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Conecta con la comunidad Wordle y
                                        disfruta de los mejores torneos con
                                        amigos de todo el mundo!
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        {/* Modo ayuda */}
                        <Card sx={cardSize}>
                            <CardActionArea onClick={() => navigate('/helper')}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image="/img/pressF.jpeg"
                                    alt="F"
                                    sx={cardSize}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Necesitas ayuda?
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Te trabaste y no sabes que hacer? Tenes
                                        miedo de quedar ultimo en la tabla? Usa
                                        nuestro servicio de ayuda de ultima
                                        tecnologia y gana!
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        {/* Cargar Resultados */}
                        <Card sx={cardSize}>
                            <CardActionArea
                                onClick={() => navigate('championship/score')}
                            >
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image="/img/wordle.jpeg"
                                    alt="upload img"
                                    sx={cardSize}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        Cargar Resultado
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Todavia no cargaste tu partida diaria de
                                        wordle? Vamos, a por ello!
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
