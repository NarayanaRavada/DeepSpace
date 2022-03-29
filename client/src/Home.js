import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./components/Post";
import { Box } from "@mui/system";
import Newpost from "./components/NewPost";
import { db } from "./firebase-config";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const [userdetails, setUserdetails] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("fron onauthstate",user);
      if (user) {
        console.log("fromhome auth", auth);
        console.log(auth.currentUser.email);
        const docRef = doc(db, "users", auth.currentUser.email);
        getDoc(docRef).then((docSnap) => {
          console.log("this is the doc", docSnap.data());
          setUserdetails(docSnap.data());
        });
      } else {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          });

        setUserdetails(null);
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
    console.log("sigining out", userdetails);
    if (userdetails) {
      sessionStorage.removeItem("Auth Token");
      setUserdetails(null);
      signOut(auth)
        .then(() => {console.log("now newuser",userdetails);})
        .catch((error) => {});
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
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "70vw",
      }}
    >
      <Navbar toggleLoginout={toggleLoginout} userdetails={userdetails} />
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
        {userdetails && <Newpost />}
      </Box>
    </Box>
  );
};

export default Home;
