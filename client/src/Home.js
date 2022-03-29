import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./components/Post";
import { Box } from "@mui/system";
import Newpost from "./components/NewPost";
import { db } from "./firebase-config";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const userContext = React.createContext(null);
const Home = () => {
  const auth = getAuth();
  const [userdetails, setUserdetails] = useState({
    username: " ",
    profilepicURL: " ",
    fullname: " ",
    postscreated: [],
    postsliked: [],
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("fromhome auth", auth);
        console.log(auth.currentUser.email);
        const docRef = doc(db, "users", auth.currentUser.email);
        getDoc(docRef).then((docSnap) => {
          console.log("this is the doc", docSnap.data());
          setUserdetails(docSnap.data());
        });
      } else {
        // User is signed out
        // ...
      }
    });
  }, [auth]);

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

  let navigate = useNavigate();
  const toggleLoginout = () => {
    if (userdetails) {
      sessionStorage.removeItem("Auth Token");
      setUserdetails(null);
    } else {
      navigate("/login");
    }
  };
  // useEffect(() => {
  //   let authToken = sessionStorage.getItem("Auth Token");
  //   if (!authToken) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <userContext.Provider value={userdetails}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70vw",
        }}
      >
        <Navbar toggleLoginout={toggleLoginout} />
        <Box
          sx={{
            positon: "relative",
            display: "flex",
            flexGrow: 1,
            mt: 4,
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
    </userContext.Provider>
  );
};

export default Home;
