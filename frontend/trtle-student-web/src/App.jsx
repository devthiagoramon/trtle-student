import React, { useState } from "react";
import { ListProvider } from "./context/listContext";
import Layout from "./components/Layout";
import ListGrid from "./components/ListGrid";
import Login from "./pages/Login";
import CriarPomodoro from "./pages/CriarPomodoro";
import PomodoroScreen from "./pages/PomodoroScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pomodoroConfig, setPomodoroConfig] = useState(null);

  return (
    <ListProvider>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          {!pomodoroConfig ? (
            <CriarPomodoro onCreate={(config) => setPomodoroConfig(config)} />
          ) : (
            <PomodoroScreen
              focusTime={pomodoroConfig.focusTime}
              breakTime={pomodoroConfig.breakTime}
              sets={pomodoroConfig.sets}
            />
          )}

          <Layout>
            <ListGrid />
          </Layout>
        </>
      )}
    </ListProvider>
  );
}

export default App;
