import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify"; // Importando ToastContainer
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/lista_tarefas");
  }, []);
  return (
    <>
      <Cadastro/>
      <ToastContainer />
    </>
  );
}

export default App;
