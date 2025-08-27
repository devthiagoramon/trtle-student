import React from "react";
import { List } from "@mui/material";
import TaskItem from "../components/TaskItem";

// Este componente é responsável por exibir a lista de tarefas
// O TaskList agora recebe a prop onTaskUpdate
const TaskList = ({ correspondingTasks, handleStatusChange, onTaskUpdate }) => {
  return (
    <List sx={{ width: "100%" }}>
      {correspondingTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={handleStatusChange}
          onTaskUpdate={onTaskUpdate} // Repassando a prop onTaskUpdate
        />
      ))}
    </List>
  );
};

export default TaskList;
