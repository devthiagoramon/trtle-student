import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const TaskContext = createContext();
const API_URL = "http://localhost:3001/task/";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de um TaskProvider.");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //CREATE
  const addTask = async (newTask) => {
    try {
      const response = await axios.post(API_URL, newTask);
      setTask((prevTask) => [...prevTask, response.data]);
    } catch (err) {
      setError("Erro ao adicionar tarefa.");
    }
  };

  //READ
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTask(response.data);
    } catch (err) {
      setError("Erro ao buscar tarefas.");
    } finally {
      setLoading(false);
    }
  };

  //   UPDATE
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}${id}`, updatedTask);
      setTask((prevTask) =>
        prevTask.map((task) => (task.id === id ? response.data : task))
      );
    } catch (err) {
      setError("Erro ao atualizar tarefas.");
    }
  };

  //   DELETE
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setTask((prevTask) => prevTask.filter((task) => task.id !== id));
    } catch (err) {
      setError("Erro ao remover tarefas.");
    }
  };

  //   MOUTING
  useEffect(() => {
    fetchTasks();
  }, []);

  const contextValue = {
    task,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
