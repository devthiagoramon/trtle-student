// Esta página exibe o título da lista de tarefas
// Todas as tarefas associadas são listadas com Nome, Descrição, Status e Prazo de entrega
// As tarefas podem ser reposicionadas conforme a prioridade

import React from "react";
import Layout from "../components/Layout";
import TaskList from "../components/TaskList";
import { useLists } from "../context/ListProvider";
import { useTasks } from "../context/TaskProvider";

const Painel = () => {
  const { list } = useLists();
  const { task } = useTasks();
  const lista = list[0];
  const tarefas = task.filter((t) => (t.task_id = lista.id));

  console.log(tarefas);

  tarefas.map((t) => {
    console.log(t.id);
    console.log(t.name);
  });

  return (
    <>
      <Layout>
        <h2>Painel</h2>
        {list.map((l) => (
          <TaskList key={l.id} list={l} tasks={tarefas} />
        ))}
      </Layout>
    </>
  );
};

export default Painel;
