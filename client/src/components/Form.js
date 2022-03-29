import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "./Button";
export default function BasicTextFields({
  title,
  setPassword,
  setUsername,
  setEmail,
  handleAction,
}) {
  return (
    <div>
      <div className="heading-container">
        <h3>{title}</h3>
      </div>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
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
        {title == "Register" && (
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
      </Box>

      <Button title={title} handleAction={handleAction} />
    </div>
  );
}
