import React, { useState } from "react";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Visibility } from "../../Interfaces/Visibility";
import { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";

const CreateChampionship = () => {
  const [name, setChampionshipName] = useState("");
  const [visibility, setVisibility] = useState(Visibility.PRIVATE);
  const [languages, setLanguages] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");

  const onVisibilityChange = (event: SelectChangeEvent) => {
    setVisibility(event.target.value as Visibility);
  };

  return (
    <>
      <Typography align="center" variant="h3" marginTop="2rem">
        Crear Torneo
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          "&>*:not(last-child)": { margin: "1rem" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Visibilidad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={visibility}
            label="Visibilidad"
            onChange={onVisibilityChange}
          >
            <MenuItem value={Visibility.PRIVATE}>Privado</MenuItem>
            <MenuItem value={Visibility.PUBLIC}>Publico</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </>
  );
};

export default CreateChampionship;
