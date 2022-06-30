import Navbar from "./components/Navbar"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Post from "./components/Post"
import { Box } from "@mui/system"
import Newpost from "./components/NewPost"
import { db } from "./firebase-config"
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

const Home = () => {
  const auth = getAuth()
  const [userdetails, setUserdetails] = useState(null)
  const [dropdown, setdropdown] = useState(false)
  console.log("Home se log")
  const handleDropdown = () => {
    setdropdown((old) => {
      return !old
    })
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("fron onauthstate", user)
      if (user) {
        console.log("fromhome auth", auth)
        console.log(auth.currentUser.email)
        const docRef = doc(db, "users", auth.currentUser.uid)
        getDoc(docRef).then((docSnap) => {
          console.log("this is the doc", docSnap.data())
          setUserdetails(docSnap.data())
        })
        const q = query(collection(db, `users/${auth.currentUser.uid}/posts`))
        const unsub = onSnapshot(q, (querySnapshot) => {
          let temp = []
          querySnapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id })
          })
          setPosts(temp)
        })
        return () => unsub()
      } else {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          })

        setUserdetails(null)
      }
    })
  }, [auth])

  const [posts, setPosts] = useState([])

  let navigate = useNavigate()
  const toggleLoginout = () => {
    console.log("sigining out", userdetails)
    if (userdetails) {
      sessionStorage.removeItem("Auth Token")
      setUserdetails(null)
      signOut(auth)
        .then(() => {
          navigate("/DeepSpace/login")
          console.log("now newuser", userdetails)
        })
        .catch((error) => {})
    } else {
      navigate("/DeepSpace/login")
    }
  }
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Navbar
        toggleLoginout={toggleLoginout}
        userdetails={userdetails}
        handleDropdown={handleDropdown}
      />
      <Box
        sx={{
          positon: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt:10,
        }}
      >
        {posts.map((post) => (
          <Post key={post.id} props={post} />
        ))}

        {dropdown && <Newpost handleDropdown={handleDropdown}></Newpost>}
      </Box>
    </Box>
  )
}

export default Home
