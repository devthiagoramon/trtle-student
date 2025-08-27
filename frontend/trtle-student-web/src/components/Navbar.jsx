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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNavbar } from "../context/NavbarContext";

export default function Navbar() {
  // const [open, setOpen] = useState(false);
  const { showNavbar, handleCloseNavbar } = useNavbar();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "var(--color-primary)",
        height: "100%",
      }}
      role="presentation"
      onClick={handleCloseNavbar}
    >
      <button onClick={handleCloseNavbar}>
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
          <Link to="/config">
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Configurações</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <button
            style={{
              backgroundColor: "transparent",
              width: "100%",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              padding: "0",
            }}
            onClick={handleLogout}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* {!open && (
        <button onClick={toggleDrawer(true)}>
          <MenuOutlinedIcon />
        </button>
      )} */}
      <Drawer
        open={showNavbar}
        onClose={handleCloseNavbar}
        variant="persistent"
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
