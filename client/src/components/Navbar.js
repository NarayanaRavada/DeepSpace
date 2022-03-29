import { MenuSharp } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = ({ handleLogout }) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{}}>
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
