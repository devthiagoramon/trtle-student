import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
} from "@mui/material";


// Esquema de validação para o nome da tarefa
const taskNameSchema = yup.object().shape({
  name: yup.string().required("O nome da tarefa é obrigatório."),
});

function TaskItem({ task, onStatusChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskNameSchema),
    defaultValues: {
      name: task.name,
    },
  });

  const handleNameSubmit = (data) => {
    console.log(
      "Nome da tarefa atualizado:",
      data.name,
      "para a tarefa",
      task.id
    );
    setIsEditing(false);
    // Aqui você faria a chamada para a API para persistir a mudança
  };

  const handleDoubleClickName = () => {
    setIsEditing(true);
  };

  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked ? "feito" : "pendente";
    onStatusChange(task.id, newStatus);
    console.log(`Status da tarefa ${task.id} alterado para: ${newStatus}`);
    // Aqui você faria a chamada para a API para persistir o status
  };

  const isCompleted = task.status === "feito";

  return (
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
      <FormControlLabel
        control={
          <Checkbox checked={isCompleted} onChange={handleCheckboxChange} />
        }
        label={
          isEditing ? (
            <form
              onSubmit={handleSubmit(handleNameSubmit)}
              style={{ width: "100%" }}
            >
              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("name")}
                onBlur={handleSubmit(handleNameSubmit)}
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </form>
          ) : (
            <ListItemText
              primary={
                <Typography
                  onDoubleClick={handleDoubleClickName}
                  sx={{ cursor: "pointer" }}
                >
                  {task.name}
                </Typography>
              }
              secondary={`Prioridade: ${task.priority}`}
              sx={{ m: 0 }}
            />
          )
        }
        sx={{ m: 0, width: "100%" }}
      />
    </ListItem>
  );
}

export default TaskItem;
