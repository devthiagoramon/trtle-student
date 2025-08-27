// Esta página exibe o título da lista de tarefas
// Todas as tarefas associadas são listadas com Nome, Descrição, Status e Prazo de entrega
// As tarefas podem ser reposicionadas conforme a prioridade

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLists } from "../context/ListProvider";
import { useTasks } from "../context/TaskProvider";
import { List } from "@mui/material";
import TaskItem from "../components/TaskItem";
import * as yup from "yup";

const listSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
});

const Painel = ({ id }) => {
  const { list, addList, updateList } = useLists();
  const { task } = useTasks();

  const [selectedList, setSelectedList] = useState(null);
  const [correspondingTasks, setCorrespondingTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(listSchema),
  });

  useEffect(() => {
    if (id) {
      const foundList = list.find((l) => l.id === id);
      setSelectedList(foundList);
      if (foundList) {
        setCorrespondingTasks(task.filter((t) => t.task_id === id));
        setValue("title", foundList.title);
        setValue("description", foundList.description);
      } else {
        setSelectedList(null);
        setCorrespondingTasks([]);
        setValue("title", "");
        setValue("description", "");
      }
    }
  }, [id, list, task, setValue]);

  const handleStatusChange = (taskId, newStatus) => {
    setCorrespondingTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  console.log(correspondingTasks);

  if (!id || !selectedList) {
    return (
      <>
        <Layout>
          <h2 style={{ height: "50vh", margin: "3rem" }}>
            Nenhuma lista encontrada para este ID.
          </h2>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        {id && (
          <>
            <h1>{selectedList.title}</h1>
            <p>{selectedList.description}</p>
            <List sx={{ width: "100%" }}>
              {correspondingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </List>
          </>
        )}
      </Layout>
    </>
  );
};

export default Painel;
