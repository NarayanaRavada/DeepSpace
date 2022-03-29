import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./components/Post";
import { Box, height } from "@mui/system";
import Newpost from "./components/NewPost";

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
      <Box sx={{ display: "flex", height: "90vh", overflowY: "hidden" }}>
        <Box sx={{ height: "100%", overflowY: "scroll" }}>
          {posts.map((i) => (
            <Post key={i} props={pos} />
          ))}
        </Box>
        <Newpost />
      </Box>
    </Box>
  );
}
