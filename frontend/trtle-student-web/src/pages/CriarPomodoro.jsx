import { useState } from "react";
import { Box, Paper, Typography, Grid, TextField, Button } from "@mui/material";
import PomodoroScreen from "./PomodoroScreen";

export default function CriarPomodoro() {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [sets, setSets] = useState(4);

  // Estado que define se o Pomodoro já foi criado
  const [pomodoroConfig, setPomodoroConfig] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const focusTime = focusMinutes * 60 + focusSeconds;
    const breakTime = breakMinutes * 60 + breakSeconds;

    setPomodoroConfig({ focusTime, breakTime, sets });
  };

  const handleCancelPomodoro = () => {
    setPomodoroConfig(null);
  };

  if (pomodoroConfig) {
    return (
      <PomodoroScreen {...pomodoroConfig} onCancel={handleCancelPomodoro} />
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#d9d9d9",
        borderRadius: 2,
        boxShadow: 3,
        width: 310,
        height: 300,
        minWidth: 300,
        ml: 1
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center" gutterBottom>
        Criar Pomodoro
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <TextField
              label="Foco em Minutos"
              type="number"
              value={focusMinutes}
              onChange={(e) => setFocusMinutes(Number(e.target.value))}
              inputProps={{ min: 0 }}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Pausa em Minutos"
              type="number"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              inputProps={{ min: 0 }}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Sessões"
              type="number"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              inputProps={{ min: 1 }}
              size="small"
              fullWidth
              sx={{ mt: 0.5 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#5cab7d", color: "#222", fontSize: "0.8rem", mt: 1, width: "100%" }}
            >
              Criar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
