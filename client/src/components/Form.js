import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "./Button";
export default function BasicTextFields({
  title,
  setPassword,
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
      }}
    >
      <div className="heading-container">
        <h3>{title} Form</h3>
      </div>

      <TextField
        id="email"
        label="Enter the Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Enter the Password"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button title={title} handleAction={handleAction} />
    </div>
  );
}
