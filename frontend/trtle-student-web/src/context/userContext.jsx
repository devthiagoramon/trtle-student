import { createContext, useCallback, useContext, useState } from "react";
import api from "../api/api";

const UserContext = createContext();
const API_URL = "http://localhost:5000/user/";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider.");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleSetUser = (user) => {
    setUser(user)
  }

  const handleFetchUser = useCallback(async () => {
    if (user) return;
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data);
    } catch (error) {
      console.error(error)
    }
  }, [user, setUser])
  
  const contextValue = {
    user,
    handleSetUser,
    handleFetchUser
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
