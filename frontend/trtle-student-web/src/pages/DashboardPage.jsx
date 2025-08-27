// Essa é a página inicial do sistema após o login
// Ela exibe algumas das listas de tarefas criadas pelo usuário
// É exibido um calendário com datas de entrega
// É exibido um gráfico com o tempo de acesso durante a semana (constância)
// É exibido um botão de criar pomodoro

import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dados mockados (horas de estudo por dia)
const studyData = [
  { day: "Seg", hours: 2 },
  { day: "Ter", hours: 3 },
  { day: "Qua", hours: 1.5 },
  { day: "Qui", hours: 4 },
  { day: "Sex", hours: 2.5 },
  { day: "Sáb", hours: 5 },
  { day: "Dom", hours: 3 },
];

// Mock de produtividade
const thisWeek = studyData.reduce((acc, cur) => acc + cur.hours, 0);
const lastWeek = 18; // mock fixo
const diff = thisWeek - lastWeek;

const Dashboard = () => {
  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard de Produtividade
        </Typography>

        <Grid container spacing={3}>
          {/* Gráfico */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tempo de estudo na semana
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#5cab7d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Produtividade */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6">Produtividade</Typography>
              <Typography variant="h4" color={diff >= 0 ? "green" : "red"}>
                {diff >= 0 ? `+${diff.toFixed(1)}h` : `${diff.toFixed(1)}h`}
              </Typography>
              <Typography>
                {diff >= 0
                  ? "Você estudou mais que a semana passada 🎉"
                  : "Você estudou menos que a semana passada ⚠️"}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
