import React, { useContext, useEffect, useState } from "react";
import IChampionship from "../../Interfaces/Championship";

import HttpService from "../../services/client";
import { useNavigate } from "react-router-dom";
import UserContext from "./../../context/UserContext";
import { Grid } from "@mui/material";
import Championship from './Championship';

const PublicChampionships = () => {
  const [championships, setChampionships] = useState<IChampionship[]>([]);

  const { logout } = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    try {
      HttpService.httpGet("/championships?type=PUBLIC").then((result) => {
        console.log(result.data.championships[0]);
        setChampionships(result.data.championships);
      });
    } catch (err) {
      logout();
      navigate("/login");
      return;
    }
  },[]);

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

export default PublicChampionships;
