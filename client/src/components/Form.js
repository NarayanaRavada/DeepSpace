import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "./Button";
import { Link } from "react-router-dom";
export default function BasicTextFields({
  title,
  setPassword,
  setUserdetail,
  setEmail,
  handleAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 20,
      }}
    >
      <div className="heading-container">
        <h3>{title}</h3>
      </div>
      {title === "Register" && (
        <React.Fragment>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUserdetail(e.target.value, e.target.id)}
            sx={{ m: 1 }}
          />
          <TextField
            id="fullname"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setUserdetail(e.target.value, e.target.id)}
            sx={{ m: 1 }}
          />
        </React.Fragment>
      )}
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        sx={{ m: 1 }}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ m: 1 }}
      />
      <Button title={title} handleAction={handleAction} />
      {title === "Register" && (
        <Link to="/login">Already have Account? Login!</Link>
      )}
      {title === "Login" && (
        <Link to="/register">No Account? Create Account!</Link>
      )}
    </div>
  );
}
