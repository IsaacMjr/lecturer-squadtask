import React, { useState } from "react";
import "./Auth.css";
import logo from "../../assets/logo.png";
import { auth, db } from "../../squad-config";

// material-ui components
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";

import { FormControl, Select, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MailIcon from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@material-ui/styles";
import AuthSignUp from "./AuthSignUp";

// material-ui syles
const useStyles = makeStyles({
  textField: {
    marginTop: "5px",
    marginBottom: "10px",
  },
  btn: {
    marginTop: "15px",
  },
});

function Auth() {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [showSide, setShowSide] = useState(false);

  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [courseunit, setCourseunit] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const showPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //   sign in the dude
  const authAdmin = () => {
    auth
      .createUserWithEmailAndPassword(email, values.password)
      .then((user) => {
        user.user.updateProfile({
          displayName: username,
        });
        db.collection("lecturers")
          .doc(user.user.uid)
          .set({
            username: username,
            uid: user.user.uid,
            course: [course],
            courseunit: [courseunit],
            lectureYear: [year],
          });
      })
      .then(() => {
        setEmail("");
        setCourse("");
        setCourseunit("");
        setUsername("");
        setValues({
          password: "",
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="auth">
      <div>
        <div className="auth-select">
          <span onClick={() => setShowSide(true)}>
            <p>sign up</p>
          </span>
          <span onClick={() => setShowSide(false)}>
            <p>login </p>
          </span>
        </div>
        <div className="auth-login">
          {showSide ? (
            <div>
              <div className="auth-login-logo">
                <img src={logo} alt="header" className="auth-header-logo" />
              </div>
              <p>lecturer create account</p>
              <div className="auth-login-input">
                <TextField
                  label="lecturer name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginBottom: "5px" }}
                />

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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="type password"
                />
                <FormControl
                  style={{ width: "250px", marginTop: "10px" }}
                  className={classes.margin}
                >
                  <InputLabel id="select-course">course </InputLabel>
                  <Select
                    labelId="select-course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <MenuItem value="bist"> bist</MenuItem>
                    <MenuItem value="computer science">
                      {" "}
                      computer science
                    </MenuItem>
                    <MenuItem value="software engineering">
                      software engineering
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  style={{ width: "250px", marginTop: "10px" }}
                  className={classes.margin}
                >
                  <InputLabel id="select-course">course unit </InputLabel>
                  <Select
                    labelId="select-course"
                    value={courseunit}
                    onChange={(e) => setCourseunit(e.target.value)}
                  >
                    <MenuItem value="emerging trends">
                      {" "}
                      emerging trends
                    </MenuItem>
                    <MenuItem value="research methodology">
                      research methodology
                    </MenuItem>
                    <MenuItem value="communication skills">
                      communication skills
                    </MenuItem>
                    <MenuItem value="integrative programming">
                      integrative programming
                    </MenuItem>
                    <MenuItem value="intelligent systems">
                      intelligent systems
                    </MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <FormControl
                    style={{ width: "120px", marginTop: "10px" }}
                    className={classes.textField}
                  >
                    <InputLabel id="select-year">lecture year </InputLabel>
                    <Select
                      labelId="select-year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <MenuItem value={1}> one</MenuItem>
                      <MenuItem value={2}> two</MenuItem>
                      <MenuItem value={3}> three</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    style={{
                      width: "120px",
                      marginTop: "10px",
                      marginLeft: "10px",
                    }}
                    className={classes.textField}
                  >
                    <InputLabel id="select-year">semester </InputLabel>
                    <Select
                      labelId="select-year"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    >
                      <MenuItem value={1}> one</MenuItem>
                      <MenuItem value={2}> two</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "5px", marginLeft: "5px" }}
                onClick={authAdmin}
              >
                sign up
              </Button>
            </div>
          ) : (
            <AuthSignUp />
          )}
          {showSide && (
            <span onClick={() => setShowSide(false)}>
              <p className="auth-acct"> already have an account&nbsp;?</p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
