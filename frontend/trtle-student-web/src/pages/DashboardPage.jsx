// Essa é a página inicial do sistema após o login
// Ela exibe algumas das listas de tarefas criadas pelo usuário
// É exibido um calendário com datas de entrega
// É exibido um gráfico com o tempo de acesso durante a semana (constância)
// É exibido um botão de criar pomodoro

import { useState } from "react";
import { Box, Paper, Typography, Grid, useScrollTrigger } from "@mui/material";
import Layout from "../components/Layout";
import CriarPomodoro from "./CriarPomodoro";
import ListGrid from "../components/ListGrid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Dados mockados (horas de estudo por dia)
const studyData = [
  { day: "Seg", horas: 2 },
  { day: "Ter", horas: 3 },
  { day: "Qua", horas: 1.5 },
  { day: "Qui", horas: 4 },
  { day: "Sex", horas: 2.5 },
  { day: "Sáb", horas: 5 },
  { day: "Dom", horas: 3 },
];

// Mock de produtividade
const thisWeek = studyData.reduce((acc, cur) => acc + cur.horas, 0);
const lastWeek = 18;
const diff = thisWeek - lastWeek;

// Mock de tarefas concluídas x pendentes
const tasksData = [
  { name: "Concluídas", value: 60 },
  { name: "Pendentes", value: 40 },
];

const Colors = ["#4caf50", "#f44336"];

const Dashboard = () => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  return (
    <Layout>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard de Produtividade
        </Typography>

        {/* Grid com Gráfico de barras e Card de Produtividade */}
        <Grid
          container
          spacing={3}
          sx={{ ml: 1, display: "flex", justifyContent: "space-around" }}
        >
          {/* Gráfico de horas de estudo */}
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
                  <Bar dataKey="horas" fill="#5cab7d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Card Produtividade */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 5,
                width: 300,
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
                  ? `Parabéns! Você teve uma evolução: ${thisWeek}h esta semana contra ${lastWeek}h na semana passada!`
                  : thisWeek < lastWeek
                  ? `Que pena! Sua produtividade caiu: ${thisWeek}h esta semana contra ${lastWeek}h na semana passada :(`
                  : `Você manteve o mesmo nível de produtividade: ${thisWeek}h em ambas as semanas!`}
              </Typography>
            </Paper>
          </Grid>
          {/* PieChart de tarefas */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              width: 300,
              height: 300,
              minWidth: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tarefas realizadas
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tasksData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                >
                  {tasksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* Box com CriarPomodoro e PieChart abaixo dos cards de cima */}
        <Box
          display="flex"
          gap={4}
          mt={5}
          flexWrap="wrap"
          justifyContent="center"
          alignContent="center"
        >
          {/* CriarPomodoro */}
          <Box>
            <CriarPomodoro toggleList={toggleList} />
            {showList && <ListGrid />}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
