import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const SessionContext = createContext();
const API_URL = "http://localhost:3001/session/";

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessions deve ser usado dentro de um SessionProvider.");
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //CREATE
  const addSession = async (newSession) => {
    try {
      const response = await axios.post(API_URL, newSession);
      setSession((prevSession) => [...prevSession, response.data]);
    } catch (err) {
      setError("Erro ao adicionar sessão de pomodoro.");
    }
  };

  //READ
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setSession(response.data);
    } catch (err) {
      setError("Erro ao buscar sessões de pomodoro.");
    } finally {
      setLoading(false);
    }
  };

  //   UPDATE
  const updateSession = async (id, updatedSession) => {
    try {
      const response = await axios.put(`${API_URL}${id}`, updatedSession);
      setSession((prevSession) =>
        prevSession.map((task) => (task.id === id ? response.data : task))
      );
    } catch (err) {
      setError("Erro ao atualizar sessão de pomodoro.");
    }
  };

  //   DELETE
  const deleteSession = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setSession((prevSession) => prevSession.filter((task) => task.id !== id));
    } catch (err) {
      setError("Erro ao remover sessões de pomodoro.");
    }
  };

  //   MOUTING
  useEffect(() => {
    fetchSessions();
  }, []);

  const contextValue = {
    session,
    loading,
    error,
    addSession,
    updateSession,
    deleteSession,
    fetchSessions,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
