import React, { useEffect, useState } from "react";
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
import { CameraAlt } from "@mui/icons-material";
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
  const auth=getAuth();
  const [caption, setCaption] = useState("");
  const [imageAsFile, setImageAsFile] = useState(null);

  const handleImageAsFile = (e) => {
    console.log(e);
    const image = e.target.files[0];
    if (image == null) return;
    setImageAsFile(() => image);
  };

  const submithandler = async (e) => {
    e.preventDefault();

    if (imageAsFile == null) return;
    const fileref = ref(storage, `${uuidv4()}-${imageAsFile.name}`);
    const uploadTask = uploadBytesResumable(fileref, imageAsFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: 5,
        mt: 20,
        p: 2,
        pt: 4,
        pb: 4,
        width: 400,
        height: "max-content",
        backgroundColor: "#fff",
        borderRadius: 10,
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
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        sx={{ width: 0.9, m: 1 }}
      />
      <Button variant="contained" sx={{ width: 0.9, m: 1 }} component="label">
        <CameraAlt />
        <input type="file" hidden />
      </Button>
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
