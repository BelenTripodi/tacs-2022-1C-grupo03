import { Card, Grid, Paper } from '@mui/material';
import React from 'react';
import IChampionship from '../../Interfaces/Championship';

const Championship = ({championship}: {championship: IChampionship}) => {
    const { name, languages, startDate, finishDate } = championship;
    
    return (
        <>
        <Grid xs={6} margin={1} display="block" item maxWidth={600}>
        <Paper variant="elevation" elevation={2} sx={{padding: 1}}>
            <h3>
                Titulo: {name}
            </h3>
            <Grid xs={3} item>
            <Card variant="outlined" sx={{padding: 2}}>
                <h3>
                Lenguajes: 
                </h3>
                {languages.map((lang,index) => <p key={index}>{lang}</p>)}
            </Card>
            </Grid>
            <Grid xs={3} item>
                <h3>
                Se juega entre:
                </h3>
                <p>
                    {new Date(startDate).toLocaleDateString()} hasta {new Date(finishDate).toLocaleDateString()}
                </p>
            </Grid>
        </Paper>
        </Grid>
        </>
    )
}

export default Championship;