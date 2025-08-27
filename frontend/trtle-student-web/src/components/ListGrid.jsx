//Este componente exibe todas as listas de tarefas criadas

import React from "react";
import { useLists } from "../context/ListProvider";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";

const ListGrid = () => {
  const { list, addList,  } = useLists();

  const handleNewList = () => {
    addList({ title: "Nova Lista", description: "" });
  };

  return (
    <>
      <div className="list-grid">
        <h1>Lista de Tarefas</h1>
        <ul>
          <li className="list-card create-button">
            <button
              className="transparent-button"
              onClick={() => handleNewList()}
            >
              <AddOutlinedIcon />
              <p>Adicionar lista de tarefas</p>
            </button>
          </li>
          {list.map((task_list) => (
            <li className="list-card" key={task_list.id}>
              <Link to={`/tarefas/${task_list.id}`}>
                <h2>{task_list.title}</h2>
                <p>{task_list.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListGrid;
