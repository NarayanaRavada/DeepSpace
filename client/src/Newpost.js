import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase-config";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
export default function Newpost() {
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
  const [imageAsFile, setImageAsFile] = useState("");
  const handleImageAsFile = (e) => {
    console.log(e);
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  const submitimagehandler = (e) => {
    e.preventDefault();
    console.log("imageasfile is ", imageAsFile);
    
    const fileref = ref(storage,`${uuidv4()}-${imageAsFile.name}`);
    console.log("thisis fileref",fileref);
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
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <form>
        <input type="file" onChange={handleImageAsFile} />
        <button type="nosubmit" onClick={submitimagehandler}>
          submit
        </button>
      </form>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
