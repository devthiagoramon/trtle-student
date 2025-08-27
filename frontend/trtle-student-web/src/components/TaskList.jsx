import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLists } from "../context/ListProvider";
import { useTasks } from "../context/TaskProvider";
import Layout from "../components/Layout";
import TaskItem from "../components/TaskItem";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  List,
} from "@mui/material";

// Definir o schema yup para a lista
const listSchema = yup.object().shape({
  title: yup.string().required("O título é obrigatório"),
  description: yup.string(),
});

const Painel = ({ id }) => {
  const { list, addList, updateList } = useLists();
  const { tasks } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [correspondingTasks, setCorrespondingTasks] = useState([]);

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
        setCorrespondingTasks(tasks.filter((t) => t.list_id === id));
        setValue("title", foundList.title);
        setValue("description", foundList.description);
      }
    } else {
      setSelectedList(null);
      setCorrespondingTasks([]);
      setValue("title", "");
      setValue("description", "");
    }
  }, [id, list, tasks, setValue]);

  const handleEditSubmit = (data) => {
    if (selectedList) {
      updateList({ ...selectedList, ...data });
    } else {
      addList({ title: data.title, description: data.description, tasks: [] });
    }
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setCorrespondingTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  if (id && !selectedList) {
    return (
      <Layout>
        <h1>Lista não encontrada :(</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card elevation={3} sx={{ minHeight: 250, display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          {isEditing ? (
            <form onSubmit={handleSubmit(handleEditSubmit)}>
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                size="small"
                {...register("title")}
                sx={{ mb: 1 }}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                fullWidth
                label="Descrição"
                variant="outlined"
                size="small"
                multiline
                rows={2}
                {...register("description")}
                onBlur={handleSubmit(handleEditSubmit)}
                sx={{ mb: 2 }}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </form>
          ) : (
            <div onDoubleClick={handleDoubleClick} style={{ cursor: "pointer" }}>
              <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                {selectedList?.title || "Nova Lista"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 2 }}>
                {selectedList?.description || "Clique duas vezes para adicionar uma descrição."}
              </Typography>
            </div>
          )}
          <List sx={{ width: "100%" }}>
            {correspondingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))}
          </List>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Painel;