
//Este componente exibe todas as listas de tarefas criadas

import React, { useState } from "react";
import { useLists } from "../context/ListProvider";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Modal, Box, TextField, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const ListGrid = () => {
	const { list, addList, deleteList } = useLists();
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [hoveredId, setHoveredId] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [listToDelete, setListToDelete] = useState(null);
	const navigate = useNavigate();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setTitle("");
		setDescription("");
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		if (!title || !description) {
			setError("Preencha todos os campos.");
			setLoading(false);
			return;
		}
		try {
			await addList({ title, description });
			handleClose();
		} catch (err) {
			setError("Erro ao adicionar lista de tarefas.");
		} finally {
			setLoading(false);
		}
	};

	const handleListClick = (id) => {
		navigate(`/lista_tarefas/${id}`);
	};

	const handleDeleteClick = (task_list) => {
		setListToDelete(task_list);
		setConfirmOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (listToDelete) {
			await deleteList(listToDelete.id);
		}
		setConfirmOpen(false);
		setListToDelete(null);
	};

	const handleCancelDelete = () => {
		setConfirmOpen(false);
		setListToDelete(null);
	};

	return (
		<>
			<div className="list-grid">
				<h1>Lista de Tarefas</h1>
				<ul>
					<li className="list-card create-button" onClick={handleOpen} style={{cursor: "pointer"}}>
						<AddOutlinedIcon />
						<p>Adicionar lista de tarefas</p>
					</li>
								{list.map((task_list) => (
									<li
										className="list-card"
										key={task_list.id}
										onClick={() => handleListClick(task_list.id)}
										style={{ cursor: "pointer", position: "relative" }}
										onMouseEnter={() => setHoveredId(task_list.id)}
										onMouseLeave={() => setHoveredId(null)}
									>
										{hoveredId === task_list.id && (
											<IconButton
												size="small"
												sx={{ position: "absolute", top: 4, right: 4, zIndex: 2, background: 'rgba(255,255,255,0.8)' }}
												onClick={e => {
													e.stopPropagation();
													handleDeleteClick(task_list);
												}}
											>
												<CloseIcon fontSize="small" />
											</IconButton>
										)}
										<h2>{task_list.title}</h2>
										<p>{task_list.description}</p>
									</li>
								))}
			<Dialog open={confirmOpen} onClose={handleCancelDelete}>
				<DialogTitle>Confirmar deleção</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Você deseja deletar a lista "{listToDelete?.title}"?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelDelete} color="primary">Não</Button>
					<Button onClick={handleConfirmDelete} color="error">Sim</Button>
				</DialogActions>
			</Dialog>
				</ul>
			</div>
			<Modal open={open} onClose={handleClose}>
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
					<form onSubmit={handleSubmit}>
						<h2>Nova Lista de Tarefas</h2>
						<TextField
							label="Título"
							fullWidth
							margin="normal"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<TextField
							label="Descrição"
							fullWidth
							margin="normal"
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						{error && <p style={{color: 'red'}}>{error}</p>}
						<Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{mt:2}}>
							{loading ? "Adicionando..." : "Adicionar"}
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default ListGrid;

