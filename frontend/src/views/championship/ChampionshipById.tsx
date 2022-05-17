import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IChampionship from "../../Interfaces/Championship";
import HttpService from "./../../services/client/index";
import Championship from "./Championship";

import UserService from "../../services/user";
import { Paper } from "@mui/material";
import OwnerPanel from "./OwnerPanel";
import JoinPanel from "./JoinPanel";

const ChampionshipById = () => {
  const { id } = useParams();

  const [championship, setChampionship] = useState<IChampionship>();

  useEffect(() => {
    const consumeAPI = async () => {
      const result = (await (
        await HttpService.httpGet(`/championships/${id}`)
      ).data) as IChampionship;
      console.log(result);
      console.log(UserService.id());
      if (result.idOwner === UserService.id()) {
        console.log("Usuario owner");
      }
      setChampionship(result);
    };
    consumeAPI();
  }, [id]);

  return (
    <Paper variant="elevation" elevation={1} sx={{ padding: 2 , maxWidth: 600}}>
      {championship && <Championship championship={championship} />}
      {championship &&
        (championship?.idOwner === UserService.id() ? (
          <OwnerPanel
            id={championship.idChampionship}
            owner={championship.idOwner.toString()}
          />
        ) : (
          <JoinPanel
            id={championship.idChampionship}
            owner={championship.idOwner.toString()}
          />
        ))}
    </Paper>
  );
};

export default ChampionshipById;
