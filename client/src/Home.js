import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./components/Post";
import { Box } from "@mui/system";
import Newpost from "./components/NewPost";
import { db } from "./firebase-config";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", auth.currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("user data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such user!");
      }
    } else {
      // User is signed out
      // ...
    }
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setPosts(temp);
    });
    return () => unsub();
  }, []);

  console.log(posts);

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
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Box>
          {posts.map((post) => (
            <Post key={post.id} props={post} />
          ))}
        </Box>
        <Newpost />
      </Box>
    </Box>
  );
}
