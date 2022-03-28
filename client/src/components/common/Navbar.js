import { MenuSharp } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = ({ handleLogout }) => {
  return (
    <AppBar position="fixed" color="primary" style={{ width: "100%" }}>
      <Toolbar>
        <IconButton size="large" edge="start" sx={{ mr: 2 }}>
          <MenuSharp />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Deep Space
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
