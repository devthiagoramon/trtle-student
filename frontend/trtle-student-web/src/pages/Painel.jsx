import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLists } from "../context/ListProvider";
import { useTasks } from "../context/TaskProvider";
import TaskList from "../components/TaskList";
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import * as yup from "yup";

const listSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
});

const Painel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { list, addList, updateList } = useLists();
  const { task, updateTask, addTask } = useTasks();

  const [selectedList, setSelectedList] = useState(null);
  const [correspondingTasks, setCorrespondingTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register: registerList,
    handleSubmit: handleSubmitList,
    setValue: setListValue,
    formState: { errors: listErrors },
  } = useForm({
    resolver: yupResolver(listSchema),
  });

  const handleTaskUpdate = useCallback(
    (updatedTask) => {
      updateTask(updatedTask.id, updatedTask);
    },
    [updateTask]
  );

  const handleStatusChange = useCallback(
    (taskId, newStatus) => {
      const taskToUpdate = task.find((t) => t.id === taskId);
      if (taskToUpdate) {
        updateTask(taskId, { ...taskToUpdate, status: newStatus });
      }
    },
    [task, updateTask]
  );

  useEffect(() => {
    const initializePainel = async () => {
      if (id) {
        const foundList = list.find((l) => l.id === id);
        setSelectedList(foundList);
        if (foundList) {
          setCorrespondingTasks(task.filter((t) => t.task_id === id));
          setListValue("title", foundList.title);
          setListValue("description", foundList.description);
        } else {
          setSelectedList(null);
          setCorrespondingTasks([]);
          setListValue("title", "");
          setListValue("description", "");
        }
      } else {
        try {
          const newList = await addList({
            title: "Nova Lista",
            description: "",
          });
          navigate(`/painel/${newList.id}`, { replace: true });
        } catch (error) {
          console.error("Erro ao criar nova lista:", error);
        }
      }
    };

    initializePainel();
  }, [id, list, task, setListValue, addList, navigate]);

  const handleListEditSubmit = (data) => {
    if (selectedList) {
      updateList(selectedList.id, { ...selectedList, ...data });
    }
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleAddNewTask = () => {
    if (selectedList) {
      const newTask = {
        name: "Nova tarefa",
        description: "",
        status: "pendente",
        priority: 0,
        task_id: selectedList.id,
        deliveryTime: null,
      };
      addTask(newTask);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmitList(handleListEditSubmit)}>
                <TextField
                  fullWidth
                  label="Título"
                  variant="outlined"
                  size="small"
                  {...registerList("title")}
                  sx={{ mb: 1 }}
                  error={!!listErrors.title}
                  helperText={listErrors.title?.message}
                />
                <TextField
                  fullWidth
                  label="Descrição"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  {...registerList("description")}
                  onBlur={handleSubmitList(handleListEditSubmit)}
                  sx={{ mb: 2 }}
                  error={!!listErrors.description}
                  helperText={listErrors.description?.message}
                />
              </form>
            ) : (
              <div
                onDoubleClick={handleDoubleClick}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                  {selectedList?.title || "Nova Lista"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", mb: 2 }}
                >
                  {selectedList?.description ||
                    "Clique duas vezes para adicionar uma descrição."}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedList && (
          <>
            <TaskList
              correspondingTasks={correspondingTasks}
              handleStatusChange={handleStatusChange}
              onTaskUpdate={handleTaskUpdate}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleAddNewTask}>
                Adicionar Tarefa
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default Painel;
