// Esta página exibe todas as listas criadas
// Ao selecionar uma listas, as primeiras 5 tarefas da listas são exibidas em uma barra lateral
// O primeiro botão permite a inserção de uma nova lista, abrindo a página ListaTarefas sem nenhuma tarefa definida
// Se selecionar uma lista já criada, os valores são pré-definidos


// Página de Listas e Detalhes de Tarefas
import React, { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useLists } from "../context/ListProvider";
import EditIcon from '@mui/icons-material/Edit';
import Layout from "../components/Layout";
import ListGrid from "../components/ListGrid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Box, TextField, List, ListItem, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../api/api";

const API_URL = "http://localhost:5000/tasks";

const ListaTarefas = () => {
  // Função para remover tarefa (agora dentro do componente)
  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (err) {
      setTaskError("Erro ao remover tarefa.");
    }
  };
 const handleEditTask = async (taskId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const task = response.data;

    // Preenche os campos com os dados da tarefa
    setTaskName(task.name);
    setTaskDescription(task.description);
    setTaskPriority(task.priority);
    setTaskError("");
    setTaskStatus(task.status)

    // Exibe modal
    handleOpenTaskModal();

    // Exemplo: exibir o JSON da tarefa no console
    console.log(JSON.stringify(task, null, 2));

  } catch (err) {
    setTaskError("Erro ao carregar tarefa.");
    console.error(err);
  }

  if (!taskName || !taskPriority) {
      setTaskError("Preencha todos os campos obrigatórios.");
      setTaskLoading(false);
      return;
    }
    try {
      await axios.patch(
        `${API_URL}/`,
        {
          name: taskName,
          description: taskDescription,
          priority: taskPriority,
          status :taskStatus,
          list_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseTaskModal();
      fetchTasks();
    } catch (err) {
      setTaskError("Erro ao Atualizar tarefa.");
    } finally {
      setTaskLoading(false);
    }
};

  const { user, handleFetchUser } = useUser();
  const { id } = useParams();
  const { list, updateList } = useLists();
  // --- ESTADO E FUNÇÕES DE EDIÇÃO DE LISTA ---
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Busca a lista atual pelo id da URL
  const currentList = list.find(l => String(l.id) === String(id));

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
    setTimeout (() => {
      window.location.reload();
    },300 )
    
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const [dayofWeek,dia,mes,ano,horario,fuso] = timestamp.split(' ');
    return `${dia} ${mes} ${ano}`
    


};

  // --- DETALHE DE LISTA ---
  const [tasks, setTasks] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState(1);
  const [taskError, setTaskError] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskStatus,setTaskStatus] = useState(1);

  useEffect(() => {
    if (!user) handleFetchUser();
  }, []);

  useEffect(() => {
    if (id) fetchTasks();
    // eslint-disable-next-line
  }, [id]);

  // --- FUNÇÕES DE TAREFA (DETALHE) ---
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
    setTaskDescription("");
    setTaskPriority(1);
    setTaskError("");
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
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/`,
        {
          name: taskName,
          description: taskDescription,
          priority: taskPriority,
          status :"pendente",
          list_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseTaskModal();
      fetchTasks();
    } catch (err) {
      setTaskError("Erro ao adicionar tarefa.");
    } finally {
      setTaskLoading(false);
    }
  };

  return (
    <Layout>
      {/* --- SEÇÃO: LISTA DE TODAS AS LISTAS --- */}
      {!id && <ListGrid />}

      {/* --- SEÇÃO: DETALHE DE UMA LISTA (TAREFAS) --- */}
      {id && (
        <div style={{ padding: 24 }}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Typography variant="h4" gutterBottom sx={{ mr: 2, textAlign: 'center' }}>
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
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}>
              <form onSubmit={handleEditSubmit}>
                <h2>Editar Lista</h2>
                <TextField
                  label="Título"
                  fullWidth
                  margin="normal"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <TextField
                  label="Descrição"
                  fullWidth
                  margin="normal"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                />
                {editError && <p style={{color: 'red'}}>{editError}</p>}
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={editLoading} sx={{mt:2}}>
                  {editLoading ? "Salvando..." : "Salvar"}
                </Button>
              </form>
            </Box>
          </Modal>
          <Button variant="contained" color="primary" onClick={handleOpenTaskModal} sx={{ mb: 2 }}>
            Adicionar tarefa
          </Button>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{task.name}</Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>{task.description}</Typography>
                  <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>

                    Prioridade: {task.priority} |
                    Status: {task.status ? task.status : "-"} |
                    Criada em: {task.created_at ? formatDate(task.created_at): console.log(task)}
                  </Typography>
                </Box>
                <IconButton edge = "end" aria-label ="edit" onClick={() => handleEditTask(task.id)} sx={{ ml: 2, mt: 0.5 }}>
                  <EditIcon/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)} sx={{ ml: 2, mt: 0.5 }}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          {/* Modal de criação de tarefa */}
          <Modal open={openTaskModal} onClose={handleCloseTaskModal}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}>
              <form onSubmit={handleTaskSubmit}>
                <h2>Nova Tarefa</h2>
                <TextField
                  label="Nome"
                  fullWidth
                  margin="normal"
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
                  required
                />
                <TextField
                  label="Descrição"
                  fullWidth
                  margin="normal"
                  value={taskDescription}
                  onChange={e => setTaskDescription(e.target.value)}
                />
                <TextField
                  label="Prioridade"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={taskPriority}
                  onChange={e => setTaskPriority(Number(e.target.value))}
                  required
                />
                {taskError && <p style={{color: 'red'}}>{taskError}</p>}
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={taskLoading} sx={{mt:2}}>
                  {taskLoading ? "Adicionando..." : "Adicionar"}
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
