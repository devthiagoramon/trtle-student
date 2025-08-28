import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Layout from "../components/Layout";
import { useUser } from "../context/userContext";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/api";
import { toast } from "react-toastify";

const schema = yup
  .object({
    username: yup.string().required("Digite o seu user!"),
    email: yup
      .string()
      .email("Digite um e-mail valido!")
      .required("Digite o seu e-mail"),
  })
  .required();

const Config = () => {
  const [photo, setPhoto] = useState(null);
  const { user, handleSetUser, handleFetchUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email || "",
      username: user?.username || ""
    }
  });

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // cria URL temporária da imagem
    }
  };

  useEffect(() => {
    handleFetchUser();
    reset({
      username: user?.username,
      email: user?.email,
    });
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const response = await api.patch(`/users/${user.id}`, {
        username: data.username,
        email: data.email,
      });
      handleSetUser(response.data);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "#5cab7d",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 4,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: 1200,
            height: "auto",
            borderRadius: 4,
            p: 6,
            position: "relative",
            bgcolor: "#d9d9d9",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={photo || ""}
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: "#b1b0b0ff",
                  boxShadow: 3,
                }}
              >
                {!photo && <EditIcon sx={{ fontSize: 48, color: "gray" }} />}
              </Avatar>

              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "#5cab7d",
                  color: "white",
                  "&:hover": { bgcolor: "#4a9b6d" },
                }}
              >
                <EditIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <Typography sx={{alignSelf: "flex-start"}} variant="body1">Nome do usuário</Typography>
            <TextField
              error={!!errors.username}
              helperText={!!errors.username && errors.username.message}
             
              variant="outlined"
              fullWidth
              {...register("username")}
            />
            <Typography sx={{alignSelf: "flex-start"}} variant="body1">E-mail</Typography>
            <TextField
              error={!!errors.email}
              helperText={!!errors.email && errors.email.message}
             
              variant="outlined"
              fullWidth
              {...register("email")}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                bgcolor: "#5cab7d",
                "&:hover": { bgcolor: "#4a9b6d" },
                fontSize: 20,
                fontWeight: "bold",
                py: 1.5,
              }}
            >
              Salvar perfil
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Config;
