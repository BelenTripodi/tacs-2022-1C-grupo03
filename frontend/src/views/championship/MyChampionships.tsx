import React, { useState, useEffect } from "react";
import HttpService from './../../services/client/index';

import UserSerivce from "../../services/user"

interface IChampionship{
    name: string;
    languages: Array<string>;
    visibility: "PUBLIC" | "PRIVATE";
    startDate: string;
    finishDate: string;

}

const MyChampionships = () => {
    const [championships, setChampionships] = useState<IChampionship[]>([]);

    useEffect(() => {
        HttpService.httpGet(`/championships?username=${UserSerivce.username()}`).then((result) => {
            console.log(result.data.championships[0]);
            setChampionships(result.data.championships);
        })
    },[])

    return (
    <>
        {championships.map((championship) => {
            return (
                <>
                <h2>
                    {championship.name}
                </h2>
                <p>
                    {championship.languages}
                </p>
                <p>
                    {championship.startDate}
                </p>
                <p>
                    {championship.finishDate}
                </p>
                </>
            )
        })}
    </>
    );
};

export default MyChampionships;
