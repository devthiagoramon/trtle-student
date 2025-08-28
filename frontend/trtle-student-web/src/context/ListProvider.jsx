import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ListContext = createContext();
const API_URL = "http://localhost:5000/tasklists/";

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
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, newList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Após criar, buscar todas as listas do usuário autenticado
      const userId = localStorage.getItem("user_id");
      await fetchLists(userId);
    } catch (err) {
      setError("Erro ao adicionar lista de tarefas.");
    }
  };

  //READ
  const fetchLists = async (userId) => {
    setLoading(true);
    try {
      let url = API_URL;
      if (userId) {
        url = `http://localhost:5000/tasklists/user/${userId}`;
      }
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList(response.data);
    } catch (err) {
      setError("Erro ao buscar listas de tarefas.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar listas ao montar o provider
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchLists(userId);
    }
  }, []);

  //   UPDATE
  const updateList = async (id, updatedList) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${API_URL}${id}`, updatedList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setList((prevList) => prevList.filter((task) => task.id !== id));
    } catch (err) {
      setError("Erro ao remover lista de tarefas.");
    }
  };

  //   MOUTING
  // Removido o fetchLists automático ao montar. Agora, a busca deve ser feita manualmente após login/autenticação.

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
