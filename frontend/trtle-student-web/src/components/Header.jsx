// Este componente deve exibir o ícone do usuário clicável, o que redireciona para a aba Configurações
// O nome do usário é exibido ao lado esquerdo do ícone

import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavbar } from "../context/NavbarContext";

const Header = () => {
  const userString = localStorage.getItem("user");

  const [logedUser, setLogedUser] = useState(
    userString ? JSON.parse(userString) : ""
  );
  const { handleOpenNavbar } = useNavbar();

  return (
    <header className="header">
      <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleOpenNavbar} sx={{ml: 2}}>
          <Menu sx={{width: 32, height: 32, color: "#FFFFFF"}} />
        </IconButton>
      </Box>
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
