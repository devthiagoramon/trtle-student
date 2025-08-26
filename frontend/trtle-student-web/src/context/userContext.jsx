import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const UserContext = createContext();
const API_URL = "http://localhost:3001/user/";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider.");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //CREATE
  const addUser = async (newUser) => {
    try {
      const response = await axios.post(API_URL, newUser);
      setUsers((prevUser) => [...prevUser, response.data]);
    } catch (err) {
      setError("Erro ao adicionar usuário.");
    }
  };

  //READ
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      setError("Erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  };

  //   UPDATE
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`${API_URL}${id}`, updatedUser);
      setUsers((prevUser) =>
        prevUser.map((task) => (task.id === id ? response.data : task))
      );
    } catch (err) {
      setError("Erro ao atualizar usuário.");
    }
  };

  //   DELETE
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setUsers((prevUser) => prevUser.filter((task) => task.id !== id));
    } catch (err) {
      setError("Erro ao remover usuário.");
    }
  };

  //   MOUTING
  useEffect(() => {
    fetchUsers();
  }, []);

  const contextValue = {
    user,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    fetchUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
