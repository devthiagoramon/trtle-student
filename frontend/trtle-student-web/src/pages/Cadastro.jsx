import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Apenas letras e números são permitidos")
    .min(3, "O username deve ter no mínimo 3 caracteres")
    .max(20, "O username deve ter no máximo 20 caracteres")
    .required("O username é obrigatório"),

  email: Yup.string()
    .email("Digite um email válido")
    .required("O email é obrigatório"),

  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(32, "A senha deve ter no máximo 32 caracteres")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[@$!%*?&]/,
      "A senha deve conter pelo menos um caractere especial"
    )
    .required("A senha é obrigatória"),
});

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
    h4: { fontWeight: 600 },
  },
});

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/register", data);

      if (!response.data) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar usuário");
      }

      const dataResponse = await response.data;
      console.log("✅ Usuário cadastrado:", dataResponse);

      toast.success("Cadastro realizado com sucesso!");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("❌ Erro na API:", error);
      toast.error(error.message || "Erro inesperado, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={10}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              borderRadius: "16px",
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
              Crie Sua Conta
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Forneça credenciais válidas para criar conta
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <TextField
                fullWidth
                margin="normal"
                id="username"
                name="username"
                label="Usuário"
                {...register("username")}
                error={Boolean(errors.username)}
                helperText={!!errors.username && errors.username.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: theme.palette.primary.icons }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                id="email"
                name="email"
                label="Email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={!!errors.email && errors.email.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: theme.palette.primary.icons }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                id="password"
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={!!errors.password && errors.password.message}
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
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1.2 }}
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Cadastrar"}
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Cadastro;
