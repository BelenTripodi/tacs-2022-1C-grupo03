import React, { useEffect, useState } from "react";
import { LANGUAGE } from "../../Interfaces/Language";
import LanguageSelector from "../../components/LanguageSelector";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Alert,
  Container,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HttpClient from "./../../services/client/index";
import Loading from "../../components/Loading";
import userService from "../../services/user";

interface Result {
  points: number;
  language: string;
}

const Score = () => {
  const [result, setResult] = useState<Result>({
    points: 0,
    language: LANGUAGE.ES,
  });
  const [loading, setLoading] = useState(false);
  const [updatedScore, setUpdatedScore] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const isScoreAlreadyUploaded = async () => {
      try {
        const alreadyUpdatedScore: boolean = await (
          await HttpClient.httpGet(
            `/users/${userService.username()}/score/updated?language=${result.language}`
          )
        ).data.alreadyUpdatedScore;
        console.log(alreadyUpdatedScore);
        setUpdatedScore(alreadyUpdatedScore);
      } catch (err) {
        setSuccess("");
        setError(
          "No se ha encontrado ningun torneo con ese idioma en el que estes anotado"
        );
        return;
      }
    };
    isScoreAlreadyUploaded();
    setError("");
  }, []);

  const handlePointsChange = (e: SelectChangeEvent<number>) => {
    setResult((prev) => {
      return {
        points: parseInt(e.target.value.toString()),
        language: LANGUAGE.ES,
      };
    });
  };

  const handleLanguageChange = (e: SelectChangeEvent<string>) => {
    setResult((prev) => {
      return { points: prev.points, language: e.target.value.toString() };
    });
  };
  const handleSend = async () => {
    try {
      if(!updatedScore){
        setLoading(true);
        await HttpClient.httpPost(`/users/${userService.username()}/score`, result);
        setError("");
        setSuccess("Tus puntos se cargaron correctamente");
      } else {
          setSuccess("");
          setError("Ya cargaste tus puntos hoy para ese lenguaje");
      }
    } catch (error) {
      setSuccess("");
      setError(
        "No se ha encontrado ningun torneo con ese idioma en el que estes anotado!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        sx={{
          margin: "0",
          padding: "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <Stack
              direction="row"
              spacing={2}
              sx={{ margin: "auto", marginBottom: "1rem" }}
            >
              <Typography align="center" variant="h3" marginTop="2rem">
                Agregar mis resultados
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ margin: "auto", marginBottom: "1rem" }}
            >
              <Select
                labelId={`labelPoints`}
                id={`points`}
                value={result.points}
                label="Points"
                onChange={(e) => handlePointsChange(e)}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n} points
                  </MenuItem>
                ))}
              </Select>
              <LanguageSelector
                language={result.language}
                handleChange={handleLanguageChange}
              />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ margin: "auto",padding: 1 }}>
              {error && (
                <Alert severity="error" sx={{ margin: 1 }}>
                  {error}
                </Alert>
              )}
              {success && <Alert severity="success">{success}</Alert>}
              {!error && updatedScore && <Alert severity="warning">Ya cargaste el puntaje de hoy</Alert>}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ margin: "auto" }}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSend}
              >
                Send
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default Score;
