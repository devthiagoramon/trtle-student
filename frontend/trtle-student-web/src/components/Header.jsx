// Este componente deve exibir o ícone do usuário clicável, o que redireciona para a aba Configurações
// O nome do usário é exibido ao lado esquerdo do ícone

import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavbar } from "../context/NavbarContext";
import { useUser } from "../context/userContext";

const Header = () => {
  const { user } = useUser();

  const { handleOpenNavbar } = useNavbar();

  return (
    <header className="header">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleOpenNavbar} sx={{ ml: 2 }}>
          <Menu sx={{ width: 32, height: 32, color: "#FFFFFF" }} />
        </IconButton>
      </Box>

      {user && (
        <>
          <div className="user-info">
            <div className="data-container">
              <h2 className="user-name">{user.username}</h2>
              <h3 className="user-email">{user.email}</h3>
            </div>
            <div className="icon-container">
              <img
                style={{ height: "3.2rem" }}
                className="user-icon"
                src="/img/trlte-icon.png"
                alt="User Icon"
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
