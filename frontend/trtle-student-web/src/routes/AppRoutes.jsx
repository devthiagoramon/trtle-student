import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

// import ProtectedRoutes from "./ProtectedRoutes";

// Contextos
import { ListProvider } from "../context/ListProvider";
// import { UserProvider } from "../context/UserContext";
// import { SessionProvider } from "../context/SessionContext";
import { TaskProvider } from "../context/TaskProvider";

// Páginas
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import Pomodoro from "../pages/PomodoroScreen";
import ListaTarefas from "../pages/ListaTarefas";
import Painel from "../pages/Painel";

const AppRoutes = () => {
  return (
    <>
      <TaskProvider>
        <ListProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {/* Rotas Protegidas */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/lista_tarefas" element={<ListaTarefas />} />
            <Route path="/tarefas" element={<Painel />} />
          </Routes>
        </ListProvider>
      </TaskProvider>
    </>
  );
};

export default AppRoutes;
