import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Visibility } from "../../Interfaces/Visibility";
import { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";

enum Languages {
  SPANISH = "Español",
  ENGLISH = "Inglés",
  BOTH = "Ambos",
}

const CreateChampionship = () => {
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState(Visibility.PRIVATE);
  const [languages, setLanguages] = useState(Languages.SPANISH);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");

  const onVisibilityChange = (event: SelectChangeEvent) => {
    setVisibility(event.target.value as Visibility);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value as string);
  };

  const onLanguageChange = (event: SelectChangeEvent) => {
    setLanguages(event.target.value as Languages);
  };

  const createChampionship = () => {
    console.log(name, visibility, languages);
  };

  return (
    <>
      <Typography
        align="center"
        variant="h3"
        marginTop="2rem"
        marginBottom="4rem"
      >
        Crear Torneo
      </Typography>
      <Container
        maxWidth="md"
        sx={{
          "&>*:not(last-child)": { margin: "1rem" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          value={name}
          onChange={onNameChange}
        />
        <FormControl fullWidth>
          <InputLabel id="visibility-label">Visibilidad</InputLabel>
          <Select
            labelId="visibility-label"
            value={visibility}
            label="Visibilidad"
            onChange={onVisibilityChange}
          >
            <MenuItem value={Visibility.PRIVATE}>Privado</MenuItem>
            <MenuItem value={Visibility.PUBLIC}>Publico</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="language-label">Idiomas</InputLabel>
          <Select
            labelId="language-label"
            value={languages}
            label="Idiomas"
            onChange={onLanguageChange}
          >
            <MenuItem value={Languages.SPANISH}>Español</MenuItem>
            <MenuItem value={Languages.ENGLISH}>Inglés</MenuItem>
            <MenuItem value={Languages.BOTH}>Ambos</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          "&>*:not(last-child)": { margin: "1rem" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Button variant="contained" onClick={createChampionship}>
            Crear
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CreateChampionship;
