import React from "react";
import "./header.css";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

import { makeStyles } from "@mui/styles";

import { auth } from "../../squad-config";

const useStyles = makeStyles({
  avatar: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  IconBtn: {
    marginRight: "10px",
    marginLeft: "10px",
    boxShadow: "0px 0px  5px lightgrey",
  },
  btn: {
    marginLeft: "10px",
  },
});

function Header({ user }) {
  const classes = useStyles();

  return (
    <div className="header">
      <div className="header-lg">
        <Link to="/">
          <img src={logo} alt="header" className="header-logo" />
          <p className="header-title"> squad task</p>
        </Link>
      </div>
      <div className="header-nav">{/* <h3> Navigation</h3> */}</div>
      <div className="header-btn">
        {!user ? (
          <Button aria-haspopup="true" variant="outlined" color="primary">
            SIGN UP
          </Button>
        ) : (
          <div className="header-btn-avatar">
            {/* <Avatar className={classes.avatar} src={user.photoURL} alt="" /> */}
            <Button
              className={classes.btn}
              variant="outlined"
              color="primary"
              startIcon={<ExitToAppIcon />}
              onClick={() => auth.signOut()}
            >
              SIGN OUT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
