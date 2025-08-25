import "./App.css";
import Layout from "./components/Layout";
import ListGrid from "./components/ListGrid";
import { ListProvider } from "./context/listContext";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ListProvider>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Layout>
          <ListGrid />
        </Layout>
      )}
    </ListProvider>
  );
}

export default App;

