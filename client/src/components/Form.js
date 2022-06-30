import * as React from "react"
import TextField from "@mui/material/TextField"
import Button from "./Button"
import { Link } from "react-router-dom"
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
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
        width: 350,
        margin: "auto",
        backgroundColor: "#fff",
        marginTop: 20,
        borderRadius: 4,
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
            sx={{ m: 2 }}
          />
          <TextField
            id="fullname"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setUserdetail(e.target.value, e.target.id)}
            sx={{ m: 2 }}
          />
        </React.Fragment>
      )}
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        sx={{ m: 2 }}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ m: 2 }}
      />
      <Button title={title} handleAction={handleAction} sx={{  m: 2, mb: 4, width: 1 }} />
      {title === "Register" && (
        <Link sx={{m: 2}} to="/DeepSpace/login">Already have Account? Login!</Link>
      )}
      {title === "Login" && (
        <Link to="/DeepSpace/register">No Account? Create Account!</Link>
      )}
    </div>
  )
}
