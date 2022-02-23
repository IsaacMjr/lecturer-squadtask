import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/logo.png";

// material-ui components
import OutlinedInput from "@mui/material/OutlinedInput";
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { auth } from "../../squad-config";

function AuthSignUp() {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [email, setEmail] = useState("");

  //   handle form visibility
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const showPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  //   function to login user
  const loginUser = () => {
    auth
      .signInWithEmailAndPassword(email, values.password)
      .catch((error) => error.message);
  };
  return (
    <div className="">
      <div className="auth-login-logo">
        <img src={logo} alt="header" className="auth-header-logo" />
      </div>
      <p>lecturer login</p>
      <div className="auth-login-input">
        <TextField
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "5px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />
        <InputLabel htmlFor="outline-password"></InputLabel>
        <OutlinedInput
          id="outline-password"
          value={values.password}
          onChange={handleChange("password")}
          type={values.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={showPassword}>
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="type password"
        />
        <Button variant="contained" color="primary" onClick={loginUser}>
          login
        </Button>
      </div>
    </div>
  );
}

export default AuthSignUp;
