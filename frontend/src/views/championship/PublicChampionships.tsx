import React, { useContext, useEffect, useState } from "react";
import IChampionship from "../../Interfaces/Championship";

import HttpService from "../../services/client";
import { useNavigate } from "react-router-dom";
import UserContext from "./../../context/UserContext";

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
  });

  return (
    <>
      {championships.length > 0 ? (
        championships.map((championship) => {
          return (
            <>
              <h2>{championship.name}</h2>
              <p>{championship.languages}</p>
              <p>{championship.startDate}</p>
              <p>{championship.finishDate}</p>
            </>
          );
        })
      ) : (
        <h2>No hay ningún torneo activo disponible.</h2>
      )}
    </>
  );
};

export default PublicChampionships;
