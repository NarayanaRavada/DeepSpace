import { db } from "./firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { Button } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

const Profile = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // console.log("user",user);
        // console.log("uid",uid);
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

  
  return (
    <React.Fragment>
      <h1>adfafdaf</h1>
    </React.Fragment>
  );
};
export default Profile;
