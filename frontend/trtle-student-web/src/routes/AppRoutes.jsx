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
import DashboardPage from "../pages/DashboardPage";
import Pomodoro from "../pages/PomodoroScreen";
import ListaTarefas from "../pages/ListaTarefas";
import Painel from "../pages/Painel";
import Cadastro from "../pages/Cadastro";
import Config from "../pages/Config";

const AppRoutes = () => {
  return (
    <>
      <TaskProvider>
        <ListProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cadastro" element={<Cadastro />} />
            {/* Rotas Protegidas */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/lista_tarefas" element={<ListaTarefas />} />
            <Route path="/tarefas/" element={<Painel />} />
            <Route path="/tarefas/:id" element={<HandleTasks />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </ListProvider>
      </TaskProvider>
    </>
  );
};

export default AppRoutes;

const HandleTasks = () => {
  const param = useParams();
  const id = param.id;

  return <Painel id={id} />;
};
