import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Layout from "../components/Layout";

const Config = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // cria URL temporária da imagem
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
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <TextField label="Nome de usuário" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
            />

            <Button
              variant="contained"
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
