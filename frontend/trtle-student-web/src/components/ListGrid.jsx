//Este componente exibe todas as listas de tarefas criadas

import React from "react";
import { useLists } from "../context/ListProvider";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const ListGrid = () => {
  const { list } = useLists();

  return (
    <>
      <div className="list-grid">
        <h1>Lista de Tarefas</h1>
        <ul>
          <li className="list-card create-button">
            <AddOutlinedIcon />
            <p>Adicionar lista de tarefas</p>
          </li>
          {list.map((task_list) => (
            <li className="list-card" key={task_list.id}>
              <h2>{task_list.title}</h2>
              <p>{task_list.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListGrid;
