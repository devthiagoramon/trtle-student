import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "var(--color-primary)",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <button onClick={toggleDrawer(false)}>
        <MenuOpenOutlinedIcon />
      </button>
      <List>
        <ListItem disablePadding>
          <Link to="/dashboard">
            <ListItemButton>
              <ListItemIcon>
                <AssessmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Produtividade</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to="/lista_tarefas">
            <ListItemButton>
              <ListItemIcon>
                <FormatListBulletedOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Tarefas</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to="/pomodoro">
            <ListItemButton>
              <ListItemIcon>
                <AlarmOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Sessão de Foco</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link to="/tarefas">
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Configurações</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {!open && (
        <button onClick={toggleDrawer(true)}>
          <MenuOutlinedIcon />
        </button>
      )}
      <Drawer open={open} onClose={toggleDrawer(false)} variant="persistent">
        {DrawerList}
      </Drawer>
    </div>
  );
}
