import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  createTheme,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Importando ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos para as notificações
import api from "../api/api";
import { useUser } from "../context/userContext";
import { useLists } from "../context/ListProvider";

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

const Login = ({ onLogin }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleSetUser } = useUser();
  const { fetchLists } = useLists();

  const handleToRegister = () => {
    navigate("/cadastro");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // 1. Fazer requisição para a API
      const response = await api.post("/auth/login", {
        email: emailInput,
        password: passwordInput,
      });
      // 2. Verificar se a resposta foi bem-sucedida
      if (!response.data) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no login");
      }

      // 3. Extrair dados da resposta
      const data = await response.data;

      // 4. Login bem-sucedido
      toast.success(`Login bem-sucedido! Bem-vindo(a)!`);

      // 5. Armazenar token (se a API retornar)
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        if (data.user && data.user.id) {
          localStorage.setItem("user_id", data.user.id);
          fetchLists(data.user.id);
        }
        handleSetUser(data.user);
      }

      // 6. Navegar e chamar callback
      navigate("/lista_tarefas");
      if (onLogin) onLogin();
    } catch (error) {
      // 7. Tratar erros
      console.error("Erro no login:", error);

      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch")
      ) {
        toast.error("Erro de conexão. Verifique se o servidor está online.");
      } else {
        toast.error(
          error.message || "Nome de utilizador ou palavra-passe inválidos."
        );
      }
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
            background: "linear-gradient(135deg, #4d7656ff 0%, #31683f 100%)",
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

            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              color="primary"
            >
              Login
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Entre com suas credenciais para acessar o sistema
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
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
                onClick={handleSubmit}
              >
                Entrar
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2, py: 1.2 }}
              size="large"
              onClick={handleToRegister}
            >
              Cadastrar
            </Button>
          </Paper>
        </Container>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Login;
