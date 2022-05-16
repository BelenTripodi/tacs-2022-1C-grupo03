import React, { useState, useEffect, useContext } from "react";
import HttpService from './../../services/client/index';

import UserService from "../../services/user"
import IChampionship from "../../Interfaces/Championship";
import Championship from './Championship';
import UserContext from './../../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { Grid } from "@mui/material";

const MyChampionships = () => {
    const [championships, setChampionships] = useState<IChampionship[]>([]);

    const { logout } = useContext(UserContext);
    let navigate = useNavigate();

    console.log(championships);

    useEffect(() => {
        const consumeAPI = async () => {
            const privates = await HttpService.httpGet(`/users/${UserService.id()}/championships?type=PRIVATE`);
            const publics = await HttpService.httpGet(`/users/${UserService.id()}/championships?type=PUBLIC`);
            
            setChampionships([...privates.data.championships,...publics.data.championships]);     
        }

        try{
            consumeAPI();
        }catch(err){
            console.log("Hay error");
            logout();
            navigate("/login");
            return;
        }
    }, [logout,navigate]);

    return (
    <Grid container>
        {(championships && championships.length > 0) ? championships.map((championship,index) => {
            return (
                <Grid item xs={12}>
                    <Link to={`../${championship.idChampionship}`} style={{ textDecoration: 'none' }}>
                        <Championship championship={championship} key={index}/>
                    </Link>
                </Grid>
            )
        }) : (
            <h2>
                No posee torneos propios activos.
            </h2>
        )}
    </Grid>
    );
};

export default MyChampionships;
