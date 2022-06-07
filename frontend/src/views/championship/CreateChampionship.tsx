import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Visibility } from "../../Interfaces/Visibility";
import { SelectChangeEvent } from "@mui/material/Select";
import Container from "@mui/material/Container";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HttpClient from "../../services/client";
import UserContext from "../../context/UserContext";

enum Languages {
  SPANISH = "Español",
  ENGLISH = "Inglés",
  BOTH = "Ambos",
}

const yearFromNow = (date: Date): Date => {
  const newDate = new Date(date.getTime());
  newDate.setFullYear(date.getFullYear() + 1);
  return newDate;
};

const weeksFromNow = (now: Date, weeks: number): Date => {
  return new Date(now.getTime() + 1000 * 60 * 60 * 24 * weeks * 7);
};

const CreateChampionship = () => {
  const today: Date = new Date();
  const DEFAULT_DURATION_IN_WEEKS = 2;
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState(Visibility.PRIVATE);
  const [languages, setLanguages] = useState(Languages.SPANISH);
  const [startDate, setStartDate] = useState<Date | null>(today);
  const [finishDate, setFinishDate] = useState<Date | null>(
    weeksFromNow(today, DEFAULT_DURATION_IN_WEEKS)
  );
  const userName = useContext(UserContext).user.name;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  });

  const onVisibilityChange = (event: SelectChangeEvent) => {
    setVisibility(event.target.value as Visibility);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value as string);
  };

  const onLanguageChange = (event: SelectChangeEvent) => {
    setLanguages(event.target.value as Languages);
  };

  const validateForm = () => {
    const isValid =
      name !== null &&
      name !== "" &&
      startDate !== null &&
      finishDate !== null &&
      visibility !== null &&
      languages !== null &&
      userName !== null;
    setIsFormValid(isValid);
  };

  const createChampionship = () => {
    const requestLanguages =
      languages === Languages.BOTH
        ? ["SPANISH", "ENGLISH"]
        : languages === Languages.ENGLISH
        ? ["ENGLISH"]
        : ["SPANISH"];

    const body = {
      name,
      languages: requestLanguages,
      visibility,
      startDate,
      finishDate,
      owner: userName,
    };

    HttpClient.httpPost("/championships", body)
      .then((result) => {
        setName("");
        setVisibility(Visibility.PRIVATE);
        setLanguages(Languages.SPANISH);
        setStartDate(today);
        setFinishDate(weeksFromNow(today, DEFAULT_DURATION_IN_WEEKS));
        setError("");
        setSuccess("Torneo creado exitosamente");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      })
      .catch((err) => {
        setSuccess("");
        setError("Error al cargar el torneo");
      });
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
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            value={name}
            onChange={onNameChange}
          />
        </FormControl>
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
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha inicial"
              value={startDate}
              minDate={today}
              maxDate={yearFromNow(today)}
              onChange={(newValue) => {
                setStartDate(newValue);
                setFinishDate(
                  weeksFromNow(newValue!, DEFAULT_DURATION_IN_WEEKS)
                );
              }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de fin"
              value={finishDate}
              minDate={startDate}
              maxDate={yearFromNow(startDate!)}
              onChange={(newValue) => {
                setFinishDate(newValue);
              }}
              disabled={startDate === null}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
        <FormControl fullWidth>
          {error && (
            <Alert severity="error" sx={{ margin: 1 }}>
              {error}
            </Alert>
          )}
          {success && <Alert severity="success">{success}</Alert>}
          <Button
            variant="contained"
            onClick={createChampionship}
            disabled={!isFormValid}
          >
            Crear
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default CreateChampionship;
