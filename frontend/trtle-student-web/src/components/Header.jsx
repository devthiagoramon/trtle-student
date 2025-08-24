// Este componente deve exibir o ícone do usuário clicável, o que redireciona para a aba Configurações
// O nome do usário é exibido ao lado esquerdo do ícone

import React, { useState } from "react";

const Header = () => {
  const [logedUser, setLogedUser] = useState({
    name: "Ian Garrido",
    email: "igr.eng23@uea.edu.br",
  });
  console.log(logedUser.name);

  return (
    <header className="header">
      <div className="user-info">
        <div className="data-container">
          <h2 className="user-name">{logedUser.name}</h2>
          <h3 className="user-email">{logedUser.email}</h3>
        </div>
        <div className="icon-container"></div>
      </div>
    </header>
  );
};

export default Header;
