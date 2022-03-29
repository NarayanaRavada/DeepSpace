import { MenuSharp } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import Profile from "../Profile";
import { userContext } from "../Home";
const Navbar = ({ toggleLoginout }) => {
  const userdetails = useContext(userContext);
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{}}>
          Deep Space
        </Typography>
        <Button variant="contained" onClick={toggleLoginout}>
          {userdetails && "Log out" || "Log in"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
