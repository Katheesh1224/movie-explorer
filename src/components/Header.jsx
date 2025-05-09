import React from "react";
import { AppBar, Toolbar, Typography, Button, Switch, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ mode, toggleMode }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={Link}
          to="/home"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Movie Explorer
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch checked={mode === "dark"} onChange={toggleMode} />
          <Typography>{mode === "dark" ? "Dark" : "Light"}</Typography>
          <Button component={Link} to="/favorites" color="inherit">
            Favorites
          </Button>
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
