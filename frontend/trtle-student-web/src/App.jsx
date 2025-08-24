import "./App.css";
import Layout from "./components/Layout";
import ListGrid from "./components/ListGrid";
import { ListProvider } from "./context/listContext";
import Login from "./pages/Login"; // default import

import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ListProvider>
      <Layout>
        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <ListGrid />
        )}
      </Layout>
    </ListProvider>
  );
}

export default App;


