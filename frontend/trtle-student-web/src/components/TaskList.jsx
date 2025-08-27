import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TaskItem from "./TaskItem";
import { Card, CardContent, Typography, TextField, List } from "@mui/material";

// Esquema de validação para o título da lista
const listTitleSchema = yup.object().shape({
  title: yup.string().required("O título da lista é obrigatório."),
});

function TaskList({ list, tasks }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTasks, setCurrentTasks] = useState(tasks);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(listTitleSchema),
    defaultValues: {
      title: list.title,
    },
  });

  const handleTitleSubmit = (data) => {
    console.log("Título da lista atualizado:", data.title);
    setIsEditingTitle(false);
    setTimeout
    // Aqui você faria a chamada para a API para persistir a mudança
  };

  const handleDoubleClickTitle = () => {
    setIsEditingTitle(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <Card
      elevation={3}
      sx={{ minHeight: 250, display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {isEditingTitle ? (
          <form onSubmit={handleSubmit(handleTitleSubmit)}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              {...register("title")}
              onBlur={handleSubmit(handleTitleSubmit)}
              autoFocus
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </form>
        ) : (
          <Typography
            variant="h5"
            component="h2"
            onDoubleClick={handleDoubleClickTitle}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            {list.title}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic", mb: 2 }}
        >
          {list.description}
        </Typography>
        <List sx={{ width: "100%" }}>
          {currentTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TaskList;
