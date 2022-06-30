import "./App.css"
import React, { useState } from "react"
import Form from "./components/Form"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setDoc, doc } from "firebase/firestore"
import { db, auth } from "./firebase-config"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import Home from "./Home"
import Profile from "./Profile"
toast.configure()

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [userdetails, setUserdetails] = useState({
    username: " ",
    profilepicURL: " ",
    fullname: " ",
    postscreated: [],
    postsliked: [],
  })
  const navigate = useNavigate()

  const handleAction = async (id) => {
    if (id === 1) {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          )
          navigate("/DeepSpace/")
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password")
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email")
          }
        })
    } else if (id === 2) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          )
          try {
            await setDoc(doc(db, "users", auth.currentUser.uid), userdetails, {
              merge: true,
            })
          } catch (e) {
            console.error("Error adding newprofile data", e)
          }
          navigate("/DeepSpace")
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email Already in Use")
          }
        })
    }
  }
  const onUserdetailchange = (newusername, id) => {
    setUserdetails((olduserdetails) => {
      return {
        ...olduserdetails,
        id: newusername,
      }
    })
  }

  return (
    <React.Fragment>
      <div className="App">
        <>
          <Routes>
            <Route
              exact path="/DeepSpace/login"
              element={
                <Form
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(1)}
                />
              }
            />
            <Route
            exact
              path="/DeepSpace/register"
              element={
                <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setUserdetail={onUserdetailchange}
                  handleAction={() => handleAction(2)}
                />
              }
            />
            <Route exact path="/DeepSpace/" element={<Home />} />
            <Route path="*" element={<Navigate to="/DeepSpace/" replace />} />
          </Routes>
        </>
      </div>
    </React.Fragment>
  )
}

export default App
