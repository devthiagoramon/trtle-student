// Este componente deve exibir o ícone do usuário clicável, o que redireciona para a aba Configurações
// O nome do usário é exibido ao lado esquerdo do ícone

import { useState } from "react";

const Header = () => {
  const userString =localStorage.getItem('user');
  
  const [logedUser, setLogedUser] = useState(userString? JSON.parse(userString):"");

  return (
    <header className="header">
      <div className="user-info">
        <div className="data-container">
          <h2 className="user-name">{logedUser.username}</h2>
          <h3 className="user-email">{logedUser.email}</h3>
        </div>
        <div className="icon-container"></div>
      </div>
    </header>
  );
};

export default Header;
