import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IChampionship from "../../Interfaces/Championship";
import HttpService from "./../../services/client/index";
import Championship from "./Championship";

const ChampionshipById = () => {
  const { id } = useParams();

  const [championship, setChampionship] = useState<IChampionship>();

  useEffect(() => {
    const consumeAPI = async () => {
      const result = (await (
        await HttpService.httpGet(`/championships/${id}`)
      ).data) as IChampionship;
      setChampionship(result);
    };
    consumeAPI();
  }, [id]);

  return (
            <>
                {championship && <Championship championship={championship}/>}
            </>
        );
};

export default ChampionshipById;
