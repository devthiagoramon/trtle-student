import { ToastContainer } from "react-toastify"; // Importando ToastContainer
import "./App.css";
import { UserProvider } from "./context/userContext";
import { NavbarProvider } from "./context/NavbarContext";

function App() {
  return (
    <>
      <UserProvider>
        <NavbarProvider>
          <AppRoutes />
        </NavbarProvider>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
