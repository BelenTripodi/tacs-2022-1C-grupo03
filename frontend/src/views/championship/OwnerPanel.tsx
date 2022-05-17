import { Button, Card, FormControl, Stack, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import HttpService from './../../services/client/index';
import UserService from "./../../services/user";
import Alert from './../../components/Alert';

const OwnerPanel = ({id,owner}: {id: number,owner: string}) => {
    const inputUserId = useRef<HTMLInputElement>(null);

    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");

    const handleAddUser = () => {
        if(inputUserId.current?.value){
            HttpService.httpPut(`/championships/${id}/users`,{
                owner: UserService.username(),
                idUser: Number(inputUserId.current.value)
            }).then(() => {
                setSuccess("Usuario agregado correctamente");
            }).catch((err) => {
                setError(err.message);
            })
        } else {
            setError("Debe proveer un Id de Usuario")
        }
    }

    return (
        <Card>
            <FormControl sx={{margin: 2}}>
                <Stack direction="row" spacing={2}>
                <h3>
                Agregar usuario al torneo
                </h3>
                <TextField required id="outlined-required" label="Id" placeholder="Id de Usuario" ref={inputUserId}/>
                <Button variant="outlined" onClick={handleAddUser}>
                    Agregar usuario
                </Button>
                </Stack>
                {error && <Alert severity="error" sx={{margin: 1}}>{error}</Alert>}
                {success && <Alert severity="success" sx={{margin: 1}}>{success}</Alert>}
            </FormControl>
        </Card>
    );
}

export default OwnerPanel;