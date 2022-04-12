import React, { useContext, useState } from "react";
import { storage, db } from "../firebase-config";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { AddAPhoto, CameraAlt } from "@mui/icons-material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";

export default function Newpost() {
  const auth = getAuth();
  const [caption, setCaption] = useState("");
  const [imageAsFile, setImageAsFile] = useState(null);

  const handleImageAsFile = (e) => {
    console.log(e);
    const image = e.target.files[0];
    setImageAsFile(() => image);
  };

  const submithandler = async (e) => {
    e.preventDefault();

    if (imageAsFile == null) return;
    const fileref = ref(storage, `${uuidv4()}-${imageAsFile.name}`);
    const uploadTask = uploadBytesResumable(fileref, imageAsFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        if (progress === "100") {
          setCaption("");
          setImageAsFile(null);
        }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, "/posts"), {
            email: auth.currentUser.email,
            createdTime: new Date().toUTCString(),
            caption: caption,
            url: downloadURL,
          });
        });
      }
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 20,
        p: 2,
        width: 300,
        height: "max-content",
        backgroundColor: "#fff",
        borderRadius: 1,
      }}
    >
      <h3>Drop a post</h3>
      <Button
        variant="outlined"
        sx={{ width: 250, height: 250, m: 1 }}
        component="label"
      >
        <AddAPhoto />
        <input type="file" onChange={handleImageAsFile} hidden />
      </Button>
      <TextField
        multiline
        variant="standard"
        label="Give a great caption !"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        sx={{ width: 0.9, m: 1 }}
      />
      <Button
        variant="contained"
        size="larger"
        onClick={submithandler}
        sx={{ width: 0.9, m: 1 }}
      >
        Post
      </Button>
    </Box>
  );
}
