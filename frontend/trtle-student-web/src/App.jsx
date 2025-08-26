import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify"; // Importando ToastContainer

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/lista_tarefas");
  }, []);
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
