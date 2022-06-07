import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IChampionship from "../../Interfaces/Championship";
import HttpService from "./../../services/client/index";
import Championship from "./Championship";

import UserService from "../../services/user";
import {  Grid, Paper } from "@mui/material";
import OwnerPanel from "./OwnerPanel";
import JoinPanel from "./JoinPanel";
import ScoreBoard from "./ScoreBoard";

const ChampionshipById = () => {
  const { id } = useParams();

  const [championship, setChampionship] = useState<IChampionship>();

  useEffect(() => {
    const consumeAPI = async () => {
      const championship = (await (
        await HttpService.httpGet(`/championships/${id}`)
      ).data) as IChampionship;
      setChampionship(championship);
    };
    consumeAPI();
  }, [id]);

  return (
    <Paper variant="elevation" elevation={1} sx={{ padding: 2, maxWidth: 600 }}>
      {championship && <Championship championship={championship} />}
      {championship && (
        <Grid xs={6} margin={1} display="block" item maxWidth={600}>
          <Paper variant="elevation" elevation={2} sx={{ padding: 1 }}>
            <h3>
              Tabla de puntajes{" "}
            </h3>
            <ScoreBoard id={id!}/>
            <Grid xs={3} item></Grid>
          </Paper>
        </Grid>
      )}
      {championship &&
        (championship?.ownerUsername === UserService.username() ? (
          <OwnerPanel
            id={championship.idChampionship}
            owner={championship.ownerUsername.toString()}
          />
        ) : (
          <JoinPanel
            id={championship.idChampionship}
            owner={championship.ownerUsername.toString()}
          />
        ))}
    </Paper>
  );
};

export default ChampionshipById;
