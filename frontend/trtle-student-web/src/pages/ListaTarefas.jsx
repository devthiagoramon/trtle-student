// Esta página exibe todas as listas criadas
// Ao selecionar uma listas, as primeiras 5 tarefas da listas são exibidas em uma barra lateral
// O primeiro botão permite a inserção de uma nova lista, abrindo a página ListaTarefas sem nenhuma tarefa definida
// Se selecionar uma lista já criada, os valores são pré-definidos

import React, { useEffect } from "react";

// Componentes
import Layout from "../components/Layout";
import ListGrid from "../components/ListGrid";
import { useUser } from "../context/userContext";

const ListaTarefas = () => {
  const { user, handleFetchUser } = useUser();

  useEffect(() => {
    if (!user) {
      handleFetchUser();
      console.log(user);
      return;
    }
    console.log(user);
  }, []);

  return (
    <>
      <Layout>
        <ListGrid />
      </Layout>
    </>
  );
};

export default ListaTarefas;
