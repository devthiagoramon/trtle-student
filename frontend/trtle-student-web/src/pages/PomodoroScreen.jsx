// Esta página deve exibir o cronômetro do Pomodoro
// Deve haver botões de pausar e de interromper de sessão
// Um botão deve permitir visualizar a lista de atividades associadas àquela sessão

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

export default function PomodoroScreen({ focusTime = 25 * 60, breakTime = 5 * 60, sets = 4 }) {
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(true); // começa automático
  const [mode, setMode] = useState("FOCO");
  const [currentSet, setCurrentSet] = useState(1);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };


    // Alterna modo quando timeLeft chega a 0 (FUNCIONA MENOS A PARTE DE (N/M))
    useEffect(() => {
      if (timeLeft > 0) return;

      setCurrentSet(prevSet => {
        if (mode === "FOCO") {
          setMode("DESCANSO");
          setTimeLeft(breakTime);
          return prevSet; // não incrementa durante descanso
        } else {
          if (prevSet < sets) {
            setMode("FOCO");
            setTimeLeft(focusTime);
            return (prevSet - 1) + 1; // A INCREMENTAÇÃO TA ERRADA -> AJEITAR
          } else {
            setIsRunning(false);
            alert("Todas as sessões concluídas!");
            return prevSet;
          }
        }
      });
    }, [timeLeft, mode, breakTime, focusTime, sets]);



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
        bgcolor: "#5cab7d",
        minHeight: "100vh",
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
          maxWidth: 1000,
          height: 650,
          bgcolor: "#d9d9d9",
          borderRadius: 4,
          p: 4,
          position: "relative",
        }}
      >
        {/* Timer */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1c6d3e",
            borderRadius: 3,
            width: 500,
            height: 350,
            mx: "auto",
            mt: 4,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" color="white" fontWeight="bold" gutterBottom>
            {formatTime(timeLeft)}
          </Typography>
          <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>
            {mode} ({currentSet}/{sets})
          </Typography>

          <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#5cab7d", color: "#222", fontSize: "1.2rem" }}
              onClick={handlePause}
            >
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#5cab7d", color: "#222", fontSize: "1.2rem" }}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#5cab7d", color: "#222", fontSize: "1.2rem" }}
              onClick={() => alert("Aqui você pode abrir a lista de atividades")}
            >
              Atividades
            </Button>
          </Box>
        </Paper>

        {/* Caixa inferior mostrando próximo modo */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1c6d3e",
            borderRadius: 3,
            width: 400,
            height: 80,
            mx: "auto",
            mt: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            color="white"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
          >
            {mode === "FOCO"
              ? `Próximo Descanso → ${Math.floor(breakTime/60)}:${String(breakTime%60).padStart(2,'0')}`
              : `Próximo FOCO → ${Math.floor(focusTime/60)}:${String(focusTime%60).padStart(2,'0')}`}
          </Typography>
        </Paper>
      </Paper>
    </Box>
  );
}
