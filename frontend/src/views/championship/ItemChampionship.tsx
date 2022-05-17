import React from "react";
import { Link } from "react-router-dom";
import Championship from "./Championship";
import IChampionship from './../../Interfaces/Championship';

const ItemChampionship = ({championship}: {championship: IChampionship}) => {
    return (
        <Link to={`../${championship.idChampionship}`} style={{ textDecoration: 'none' }}>
            <Championship championship={championship}/>
        </Link>
    );
}

export default ItemChampionship;