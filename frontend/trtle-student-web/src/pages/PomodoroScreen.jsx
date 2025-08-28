import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";

export default function PomodoroScreen({
  focusTime = 25 * 60,
  breakTime = 5 * 60,
  sets = 4,
  onCancel,
  toggleList,
}) {
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState("FOCO");
  const [currentSet, setCurrentSet] = useState(1);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Alterna modo quando timeLeft chega a 0
  useEffect(() => {
    if (timeLeft > 0) return;

    setCurrentSet((prevSet) => {
      if (mode === "FOCO") {
        setMode("DESCANSO");
        setTimeLeft(breakTime);
        return prevSet;
      } else {
        if (prevSet < sets) {
          setMode("FOCO");
          setTimeLeft(focusTime);
          return prevSet + 1;
        } else {
          setIsRunning(false);
          alert("Todas as sessões concluídas!");
          return prevSet;
        }
      }
    });
  }, [timeLeft, mode, breakTime, focusTime, sets]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handlePause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(focusTime);
    setMode("FOCO");
    setCurrentSet(1);
  };

  return (
    <Box
      sx={{
        display: "grid",
        justifyItems: "center",
        alignItems: "start",
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 450,
          bgcolor: "#d9d9d9",
          borderRadius: 4,
          p: 4,
        }}
      >
        {/* Timer */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1c6d3e",
            borderRadius: 3,
            width: "100%",
            height: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Typography variant="h3" color="white" fontWeight="bold">
            {formatTime(timeLeft)}
          </Typography>
          <Typography variant="h6" color="white" fontWeight="bold" mt={1}>
            {mode} ({currentSet}/{sets})
          </Typography>
        </Paper>

        {/* Botões 2x2 */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#5cab7d",
                color: "#222",
                width: "100%",
                height: 60,
                fontSize: "1.2rem",
              }}
              onClick={handlePause}
            >
              {isRunning ? "Pause" : "Start"}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#5cab7d",
                color: "#222",
                width: "100%",
                height: 60,
                fontSize: "1.2rem",
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#5cab7d",
                color: "#222",
                width: "100%",
                height: 60,
                fontSize: "1.2rem",
              }}
              onClick={() => {
                toggleList();
              }}
            >
              Atividades
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#d9534f",
                color: "#fff",
                width: "100%",
                height: 60,
                fontSize: "1.2rem",
              }}
              onClick={() => {
                clearInterval(timerRef.current);
                if (onCancel) onCancel();
              }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>

        {/* Próximo modo */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1c6d3e",
            borderRadius: 3,
            width: "100%",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            color="white"
            fontWeight="bold"
            textAlign="center"
          >
            {mode === "FOCO"
              ? `Próximo Descanso → ${Math.floor(breakTime / 60)}:${String(
                  breakTime % 60
                ).padStart(2, "0")}`
              : `Próximo FOCO → ${Math.floor(focusTime / 60)}:${String(
                  focusTime % 60
                ).padStart(2, "0")}`}
          </Typography>
        </Paper>
      </Paper>
    </Box>
  );
}
