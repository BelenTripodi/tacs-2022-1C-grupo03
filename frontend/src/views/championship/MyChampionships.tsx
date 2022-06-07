import React, { useState, useEffect, useContext } from "react";
import HttpService from './../../services/client/index';

import UserService from "../../services/user"
import IChampionship from "../../Interfaces/Championship";
import UserContext from './../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import ItemChampionship from "./ItemChampionship";

const MyChampionships = () => {
    const [championships, setChampionships] = useState<IChampionship[]>([]);

    const { logout } = useContext(UserContext);
    let navigate = useNavigate();

    console.log(championships);

    useEffect(() => {
        const consumeAPI = async () => {
            const privates = await HttpService.httpGet(`/users/${UserService.username()}/championships?type=PRIVATE`);
            const publics = await HttpService.httpGet(`/users/${UserService.username()}/championships?type=PUBLIC`);
            
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
        <>
            {(championships && championships.length > 0) ? championships.map((championship,index) => {
            return (
                <Grid>
                    <ItemChampionship championship={championship} key={index}/>
                </Grid>
            )
        }) : (
            <h2>
                No posee torneos propios activos.
            </h2>
        )}
        </>
    );
};

export default MyChampionships;
