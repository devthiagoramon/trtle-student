// Essa é a página inicial do sistema após o login
// Ela exibe algumas das listas de tarefas criadas pelo usuário
// É exibido um calendário com datas de entrega
// É exibido um gráfico com o tempo de acesso durante a semana (constância)
// É exibido um botão de criar pomodoro

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Dashboard,
  BarChart,
  People,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const drawerWidth = 240;

const data = [
  { name: "Jan", vendas: 400 },
  { name: "Fev", vendas: 300 },
  { name: "Mar", vendas: 500 },
  { name: "Abr", vendas: 200 },
  { name: "Mai", vendas: 700 },
];
function DashboardPage() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <MenuIcon onClick={() => setOpen(!open)} sx={{ cursor: "pointer", mr: 2 }} />
          <Typography variant="h6" noWrap>
            Meu Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Visão Geral" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: open ? `${drawerWidth}px` : 0, transition: "0.3s" }}
      >
        <Toolbar />

        <Grid container spacing={3}>
          {/* Cards resumo */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Vendas Mensais
                </Typography>
                <Typography variant="h5">R$ 12.500</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Usuários Ativos
                </Typography>
                <Typography variant="h5">1.250</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Novos Leads
                </Typography>
                <Typography variant="h5">320</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gráfico */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vendas por mês
                </Typography>
                <LineChart width={600} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="vendas" stroke="#1976d2" />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default DashboardPage;