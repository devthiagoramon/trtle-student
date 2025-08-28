import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useLists } from "../context/ListProvider";
import EditIcon from "@mui/icons-material/Edit";
import Layout from "../components/Layout";
import ListGrid from "../components/ListGrid";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  TextField,
  List,
  ListItem,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:5000/tasks";

const ListaTarefas = () => {
  const { user, handleFetchUser } = useUser();
  const { id } = useParams();
  const { list, updateList } = useLists();

  // --- ESTADO E FUNÇÕES DE EDIÇÃO DE LISTA ---
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const currentList = list.find((l) => String(l.id) === String(id));

  const handleOpenEditModal = () => {
    if (currentList) {
      setEditTitle(currentList.title);
      setEditDescription(currentList.description);
      setEditError("");
      setEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditTitle("");
    setEditDescription("");
    setEditError("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    if (!editTitle || !editDescription) {
      setEditError("Preencha todos os campos.");
      setEditLoading(false);
      return;
    }
    try {
      await updateList(id, { title: editTitle, description: editDescription });
      handleCloseEditModal();
    } catch (err) {
      setEditError("Erro ao atualizar lista.");
    } finally {
      setEditLoading(false);
    }
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const [dayofWeek, dia, mes, ano, horario, fuso] = timestamp.split(" ");
    return `${dia} ${mes} ${ano}`;
  };

  // --- DETALHE DE LISTA ---
  const [tasks, setTasks] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState(1);
  const [taskError, setTaskError] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState(1);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (!user) handleFetchUser();
  }, []);

  useEffect(() => {
    if (id) fetchTasks();
  }, [id]);

  // --- FUNÇÕES DE TAREFA ---
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/list/${id}`);
      setTasks(response.data);
    } catch (err) {
      setTaskError("Erro ao buscar tarefas.");
    }
  };

  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
    setTaskName("");
    setTaskPriority(1);
    setTaskStatus(1);
    setTaskError("");
    setEditingTaskId(null);
  };

  const handleCheckboxChange = async (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "pendente" ? "concluida" : "pendente",
            }
          : task
      )
    );

    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${API_URL}/${taskId}`,
        {
          status: taskToUpdate.status === "pendente" ? "concluida" : "pendente",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Erro ao atualizar status da tarefa:", err);
    }
  };

  const startEditTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const task = response.data;
      setTaskName(task.name);
      setTaskPriority(task.priority);
      setTaskStatus(task.status);
      setEditingTaskId(taskId); // 👈 guarda o ID da task em edição
      setTaskError("");
      handleOpenTaskModal();
    } catch (err) {
      setTaskError("Erro ao carregar tarefa.");
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    setTaskLoading(true);
    setTaskError("");

    if (!taskName || !taskPriority) {
      setTaskError("Preencha todos os campos obrigatórios.");
      setTaskLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      if (editingTaskId) {
        await axios.patch(
          `${API_URL}/${editingTaskId}`,
          {
            name: taskName,
            priority: taskPriority,
            status: taskStatus,
            list_id: id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API_URL}/`,
          {
            name: taskName,
            priority: taskPriority,
            status: "pendente",
            list_id: id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      handleCloseTaskModal();
      fetchTasks();
    } catch (err) {
      setTaskError("Erro ao salvar tarefa.");
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setTaskError("Erro ao remover tarefa.");
    }
  };

  return (
    <Layout>
      {!id && <ListGrid />}

      {id && (
        <div style={{ padding: 24 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ mr: 2, textAlign: "center" }}
            >
              {currentList ? currentList.title : "Tarefas da Lista"}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              onClick={handleOpenEditModal}
              sx={{ minWidth: 0, px: 1, py: 0.5 }}
            >
              Editar
            </Button>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            {currentList ? currentList.description : ""}
          </Typography>

          {/* Modal de edição da lista */}
          <Modal open={editModalOpen} onClose={handleCloseEditModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 350,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <form onSubmit={handleEditSubmit}>
                <h2>Editar Lista</h2>
                <TextField
                  label="Título"
                  fullWidth
                  margin="normal"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <TextField
                  label="Descrição"
                  fullWidth
                  margin="normal"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                {editError && <p style={{ color: "red" }}>{editError}</p>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={editLoading}
                  sx={{ mt: 2 }}
                >
                  {editLoading ? "Salvando..." : "Salvar"}
                </Button>
              </form>
            </Box>
          </Modal>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenTaskModal}
            sx={{ mb: 2 }}
          >
            Adicionar tarefa
          </Button>

          <List sx={{ display: "flex", flexDirection: "column" }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  py: 1,
                  px: 0,
                  borderBottom: "1px solid #e0e0e0",
                  "&:last-child": { borderBottom: "none" },
                  transition: "background-color 0.3s",
                  order: task.priority,
                  ...(task.status !== "pendente" && {
                    textDecoration: "line-through",
                    color: "text.secondary",
                    backgroundColor: "#f0f0f0",
                  }),
                }}
              >
                <Checkbox
                  checked={task.status !== "pendente"}
                  onChange={() => handleCheckboxChange(task.id)}
                  sx={{ mr: 1, p: 0 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {task.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    Prioridade: {task.priority}| Criada em:{" "}
                    {task.created_at ? formatDate(task.created_at) : "-"}
                  </Typography>
                </Box>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => startEditTask(task.id)}
                  sx={{ ml: 2, mt: 0.5 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}
                  sx={{ ml: 2, mt: 0.5 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          {/* Modal de criação/edição de tarefa */}
          <Modal open={openTaskModal} onClose={handleCloseTaskModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 350,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <form onSubmit={handleTaskSubmit}>
                <h2>{editingTaskId ? "Editar Tarefa" : "Nova Tarefa"}</h2>
                <TextField
                  label="Nome"
                  fullWidth
                  margin="normal"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
                <TextField
                  label="Prioridade"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(Number(e.target.value))}
                  required
                />
                {taskError && <p style={{ color: "red" }}>{taskError}</p>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={taskLoading}
                  sx={{ mt: 2 }}
                >
                  {taskLoading
                    ? editingTaskId
                      ? "Salvando..."
                      : "Adicionando..."
                    : editingTaskId
                    ? "Salvar"
                    : "Adicionar"}
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      )}
    </Layout>
  );
};

export default ListaTarefas;
