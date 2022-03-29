import Navbar from "./components/Common/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./components/Common/Post";
import { Box, height } from "@mui/system";
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Camera, CameraAlt, CameraFront } from "@mui/icons-material";

export default function Home() {
  const posts = [1, 2, 3, 4];
  const pos = {
    uname: "username",
    caption:
      'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often called the "Red Planet"',
  };
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/home");
    }
    if (!authToken) {
      navigate("/login");
    }
  }, []);
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "70vw",
      }}
    >
      <Navbar handleLogout={handleLogout} />
      <Box sx={{ display: "flex" }}>
        <Box>
          {posts.map((i) => (
            <Post key={i} props={pos} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 20,
            p: 2,
            pt: 4,
            pb: 4,
            width: 550,
            height: "max-content",
            backgroundColor: "#eee",
          }}
        >
          <Avatar sx={{ width: 220, height: 220 }}>LN</Avatar>
          <Typography variant="h5" sx={{ mt: 4 }}>
            username
          </Typography>
          <TextField
            multiline
            variant="standard"
            label="Give a great caption !"
            sx={{ width: 1, m: 1 }}
          />
          <Button variant="contained" size="large" sx={{ width: 1, m: 1 }}>
            <CameraAlt />
          </Button>
          <Button variant="contained" size="large" sx={{ width: 1, m: 1 }}>
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
