import "./App.css";
import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  Navigate,
} from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Home from "./Home";
import Profile from "./Profile";
toast.configure();

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleAction = async (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          navigate("/home");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          }
        });
    } else if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then(async (response) => {
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          try {
            await setDoc(doc(db, "users",email), {
              username: username,
              email: email,
              Date: new Date(),
            },{merge: true});
          } catch (e) {
            console.error("Error adding newprofile data", e);
          }
          navigate("/home");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email Already in Use");
          }
        });
    }
  };
  // useEffect(() => {
  //   let authToken = sessionStorage.getItem("Auth Token");

  //   if (!authToken) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <React.Fragment>
      <div className="App">
        <>
          <Routes>
            <Route
              path="/login"
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
              path="/register"
              element={
                <Form
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setUsername={setUsername}
                  handleAction={() => handleAction(2)}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </>
      </div>
    </React.Fragment>
  );
}

export default App;
