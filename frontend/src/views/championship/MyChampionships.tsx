import React, { useState, useEffect, useContext } from "react";
import HttpService from './../../services/client/index';

import UserService from "../../services/user"
import IChampionship from "../../Interfaces/Championship";
import Championship from './Championship';
import UserContext from './../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";

const MyChampionships = () => {
    const [championships, setChampionships] = useState<IChampionship[]>([]);

    const { logout } = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        try{
            HttpService.httpGet(`/championships?username=${UserService.username()}&type=PRIVATE`).then((result) => {
                console.log(result.data.championships[0]);
                setChampionships(result.data.championships);
            }).catch(err => {
                logout();
                navigate("/login");
                return;

            })
        }catch(err){
            console.log("Hay error");
            logout();
            navigate("/login");
            return;
        }
    })

    return (
    <Grid container>
        {championships.length > 0 ? championships.map((championship,index) => {
            return (
                //@ts-ignore
                <Championship championship={championship} key={index}/>
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
