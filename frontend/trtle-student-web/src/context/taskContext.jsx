import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UserContext = createContext();
const API_URL = "http://localhost:3001/user";

const userContext = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
};

export default userContext;

// ----
export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categorias = [
    "Tradicional",
    "Especial",
    "Doce",
    "Gourmet",
    "Vegetariana",
    "Acompanhamentos",
  ];

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get(API_URL);
        setPizzas(response.data);
      } catch (err) {
        setError(err.message);
        toast.error("Falha ao carregar as pizzas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  //---CRUD---
  // CREATE
  const inserirPizza = async (novaPizza) => {
    try {
      const pizzaFormatada = {
        nome: novaPizza.nome,
        tipo: novaPizza.tipo,
        ingredientes: novaPizza.ingredientes,
        valores: {
          Pequena: novaPizza.valores.Pequena,
          Média: novaPizza.valores.Média,
          Grande: novaPizza.valores.Grande,
          Família: novaPizza.valores.Família,
        },
      };

      const response = await axios.post(API_URL, pizzaFormatada);
      setPizzas((prevPizzas) => [...prevPizzas, response.data]);
      toast.success("Pizza cadastrada com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao cadastrar a pizza.");
    }
  };

  // UPDATE
  const editarPizza = async (pizzaEditada) => {
    try {
      // Reordena o objeto para garantir a ordem no JSON
      const pizzaFormatada = {
        nome: pizzaEditada.nome,
        tipo: pizzaEditada.tipo,
        ingredientes: pizzaEditada.ingredientes,
        valores: {
          Pequena: pizzaEditada.valores.Pequena,
          Média: pizzaEditada.valores.Média,
          Grande: pizzaEditada.valores.Grande,
          Família: pizzaEditada.valores.Família,
        },
      };

      const response = await axios.put(
        `${API_URL}/${pizzaEditada.id}`,
        pizzaFormatada
      );
      setPizzas((prevPizzas) =>
        prevPizzas.map((pizza) =>
          pizza.id === response.data.id ? response.data : pizza
        )
      );
      toast.success("Pizza atualizada com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao atualizar a pizza.");
    }
  };

  // DELETAR
  const removerPizza = async (id) => {
    if (window.confirm("Confirma a exclusão da pizza?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setPizzas((prevPizzas) =>
          prevPizzas.filter((pizza) => pizza.id !== id)
        );
        toast.info("Pizza excluída com sucesso!");
      } catch (err) {
        setError(err.message);
        toast.error("Erro ao excluir a pizza.");
      }
    }
  };

  const value = {
    pizzas,
    setPizzas,
    categorias,
    loading,
    error,
    inserirPizza,
    editarPizza,
    removerPizza,
  };

  return (
    <PizzaContext.Provider value={value}>{children}</PizzaContext.Provider>
  );
};

export const usePizzas = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error("usePizzas deve ser usado dentro de um PizzaProvider");
  }
  return context;
};
