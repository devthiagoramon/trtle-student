import React from "react";
import { Routes, Route } from "react-router-dom";

// import ProtectedRoutes from "./ProtectedRoutes";

// Contextos
import { ListProvider } from "../context/ListProvider";
// import { UserProvider } from "../context/UserContext";
// import { SessionProvider } from "../context/SessionContext";
import { TaskProvider } from "../context/TaskProvider";

// Páginas
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/DashboardPage";
import Pomodoro from "../pages/PomodoroScreen";
import ListaTarefas from "../pages/ListaTarefas";
import Painel from "../pages/Painel";
import Cadastro from "../pages/Cadastro";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <>
      <TaskProvider>
        <ListProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            {/* Rotas Protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/pomodoro"
              element={
                <ProtectedRoutes>
                  <Pomodoro />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/lista_tarefas"
              element={
                <ProtectedRoutes>
                  <ListaTarefas />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/lista_tarefas/:id"
              element={
                <ProtectedRoutes>
                  <ListaTarefas />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/tarefas"
              element={
                <ProtectedRoutes>
                  <Painel />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ListProvider>
      </TaskProvider>
    </>
  );
};

export default AppRoutes;
