import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Importando ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos para as notificações
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
} from "@mui/icons-material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#5a9367",
      light: "#62b977ff",
      dark: "#31683f",
      contrastText: "#fff",
      icons: "#098912ff",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#5a9367",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 16px",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const mockUsers = [
  { id: 1, user: "rebecca", password: "123" },
  { id: 2, user: "jaehyun", password: "456" },
];

const Login = ({ onLogin }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = mockUsers.find(
      (user) => user.user.toLowerCase() === usernameInput.toLowerCase()
    );

    if (foundUser && foundUser.password === passwordInput) {
      toast.success(`Login bem-sucedido! Bem-vindo(a), ${foundUser.user}!`);
      if (onLogin) onLogin();
    } else {
      toast.error("Nome de utilizador ou palavra-passe inválidos.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5a9367",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #4d7656ff 0%, #31683f 100%)",
            py: 4,
            height: "auto",
            minHeight: "auto",
            width: "auto",
            borderRadius: "16px",
            margin: "20px",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Person sx={{ fontSize: 30, color: "#000000" }} />
            </Box>

            <Typography component="h1" variant="h4" gutterBottom color="primary">
              Login
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Entre com suas credenciais para acessar o sistema
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuário"
                name="username"
                autoComplete="username"
                autoFocus
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: theme.palette.primary.icons }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#098912ff" }} />
                        ) : (
                          <Visibility sx={{ color: "#098912ff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.2 }}
                size="large"
              >
                Entrar
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2, py: 1.2 }}
                size="large"
              >
                Cadastrar
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Usuários de demonstração:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  rebecca/123 ou jaehyun/456
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Login;
