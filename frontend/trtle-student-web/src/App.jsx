import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify"; // Importando ToastContainer
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { UserProvider } from "./context/userContext";

function App() {

  return (
    <>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
