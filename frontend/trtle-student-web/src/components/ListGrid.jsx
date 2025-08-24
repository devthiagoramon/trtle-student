//Este componente exibe todas as listas de tarefas criadas

import React from "react";
import { useLists } from "../context/listContext";

const ListGrid = () => {
  const { list } = useLists();
  console.log(list);

  return (
    <>
      <div className="list-grid">
        <ul>
          <li className="list-card create-button"></li>
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
