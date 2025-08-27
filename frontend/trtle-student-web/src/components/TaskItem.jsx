import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";

// Esquema de validação para o nome e descrição da tarefa
const taskSchema = yup.object().shape({
  name: yup.string().required("O nome da tarefa é obrigatório"),
});

function TaskItem({ task, onStatusChange, onTaskUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const clickTimeoutRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      name: task.name,
    },
  });

  useEffect(() => {
    setValue("name", task.name);
    setValue("description", task.description);
  }, [task.name, task.description, setValue]);

  const handleTaskSubmit = (data) => {
    onTaskUpdate({ ...task, name: data.name });
    setIsEditing(false);
  };

  const handleAnyClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      setIsEditing(true);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
      }, 200);
    }
  };

  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked ? "feito" : "pendente";
    onStatusChange(task.id, newStatus);
  };

  const isCompleted = task.status === "feito";

  return (
    <>
      <ListItem
        sx={{
          py: 1,
          px: 0,
          borderBottom: "1px solid #e0e0e0",
          "&:last-child": { borderBottom: "none" },
          transition: "background-color 0.3s",
          ...(isCompleted && {
            textDecoration: "line-through",
            color: "text.secondary",
            backgroundColor: "#f0f0f0",
          }),
        }}
      >
        <Checkbox
          checked={isCompleted}
          onChange={handleCheckboxChange}
          sx={{ mr: 1, p: 0 }}
        />

        {isEditing ? (
          <form
            onSubmit={handleSubmit(handleTaskSubmit)}
            style={{ width: "100%" }}
          >
            <TextField
              fullWidth
              variant="standard"
              size="small"
              {...register("name")}
              onBlur={handleSubmit(handleTaskSubmit)}
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </form>
        ) : (
          <ListItemText
            onClick={handleAnyClick}
            primary={
              <Typography sx={{ cursor: "pointer" }}>{task.name}</Typography>
            }
          />
        )}
      </ListItem>
    </>
  );
}

export default TaskItem;
