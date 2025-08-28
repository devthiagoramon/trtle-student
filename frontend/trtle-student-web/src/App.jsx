import { ToastContainer } from "react-toastify"; // Importando ToastContainer
import "./App.css";
import { UserProvider } from "./context/userContext";
import AppRoutes from "./routes/AppRoutes";

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
