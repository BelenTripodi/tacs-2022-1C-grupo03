import { Alert, Button } from "@mui/material";
import React, { useState } from "react";
import HttpService from './../../services/client';
import UserService from "./../../services/user"

const JoinPanel = ({id,owner}: {id: number,owner: string}) => {

    const [success,setSuccess] = useState("");
    const [error,setError] = useState("");

    const handleJoin = () => {
        HttpService.httpPut(`/championships/${id}/users`,{
            username: UserService.username()
        }).then(() => {
            setSuccess("Se ha unido exitosamente");
        }).catch((err) => {
            setError(err.message)
        })
    }

    return (
        <>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button variant="outlined" onClick={handleJoin}>
            Unirme al torneo
        </Button>
        </>
    );
}

export default JoinPanel;