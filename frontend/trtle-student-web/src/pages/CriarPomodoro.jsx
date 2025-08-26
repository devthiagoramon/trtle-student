// Esse é um pequeno formulário para criar o Pomodoro
// É inserido a quantidade de horas, minutos e segundos, o padrão é 25min
// É inserido o tempo das pausas, o padrão é 5min

import React from "react";

const CriarPomodoro = () => {
  return <div>CriarPomodoro</div>;
};

export default CriarPomodoro;
// Esse é um pequeno formulário para criar o Pomodoro
// É inserido a quantidade de horas, minutos e segundos, o padrão é 25min
// É inserido o tempo das pausas, o padrão é 5min

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

export default function CriarPomodoro({ onCreate }) {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [sets, setSets] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    const focusTime = focusMinutes * 60 + focusSeconds;
    const breakTime = breakMinutes * 60 + breakSeconds;
    onCreate({ focusTime, breakTime, sets });
  };

  return (
    <Box sx={{ bgcolor: "#5cab7d", minHeight: "100vh", display: "grid", justifyItems: "center", alignItems: "start", p: 4 }}>
      <Paper elevation={6} sx={{ width: "90%", maxWidth: 450, bgcolor: "#d9d9d9", borderRadius: 4, p: 4, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Criar Pomodoro
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight="bold">Tempo de Foco</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Minutos" type="number" value={focusMinutes} onChange={(e) => setFocusMinutes(Number(e.target.value))} inputProps={{ min: 0 }} sx={{ width: 90, mt: 3, ml: 2 }} />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Segundos" type="number" value={focusSeconds} onChange={(e) => setFocusSeconds(Number(e.target.value))} inputProps={{ min: 0, max: 59 }} sx={{ width: 90, mt: 3 }} />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" fontWeight="bold">Tempo de Pausa</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Minutos" type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value))} inputProps={{ min: 0 }} sx={{ width: 90, mt: 3, ml: 1 }} />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Segundos" type="number" value={breakSeconds} onChange={(e) => setBreakSeconds(Number(e.target.value))} inputProps={{ min: 0, max: 59 }} sx={{ width: 90, mt: 3 }} />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField label="Número de sessões" type="number" value={sets} onChange={(e) => setSets(Number(e.target.value))} inputProps={{ min: 1 }} sx={{ width: 90, mt: 3 }} />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button type="submit" variant="contained" sx={{ bgcolor: "#5cab7d", color: "#222", fontSize: "1.1rem", px: 4 }}>
                  Criar Pomodoro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}