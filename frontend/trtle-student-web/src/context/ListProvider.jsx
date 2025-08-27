import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const ListContext = createContext();
const API_URL = "http://localhost:5000/tasklists/user/1";

export const useLists = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useLists deve ser usado dentro de um ListProvider.");
  }
  return context;
};

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //CREATE
  const addList = async (newList) => {
    try {
      const response = await axios.post(API_URL, newList);
      setList((prevList) => [...prevList, response.data]);
    } catch (err) {
      setError("Erro ao adicionar lista de tarefas.");
    }
  };

  //READ
  const fetchLists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setList(response.data);
    } catch (err) {
      setError("Erro ao buscar listas de tarefas.");
    } finally {
      setLoading(false);
    }
  };

  //   UPDATE
  const updateList = async (id, updatedList) => {
    try {
      const response = await axios.put(`${API_URL}${id}`, updatedList);
      setList((prevList) =>
        prevList.map((task) => (task.id === id ? response.data : task))
      );
    } catch (err) {
      setError("Erro ao atualizar lista de tarefas.");
    }
  };

  //   DELETE
  const deleteList = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setList((prevList) => prevList.filter((task) => task.id !== id));
    } catch (err) {
      setError("Erro ao remover lista de tarefas.");
    }
  };

  //   MOUTING
  useEffect(() => {
    fetchLists();
  }, []);

  const contextValue = {
    list,
    loading,
    error,
    addList,
    updateList,
    deleteList,
    fetchLists,
  };

  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
};
