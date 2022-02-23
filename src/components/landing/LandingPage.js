import React, { useState, useEffect } from "react";
import { db } from "../../squad-config";
import "./LandingPage.css";
import Announcement from "../announce/Announcement";

// material-ui components
import { Avatar, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Summary from "../../container/summaryData/Summary";

function LandingPage({ user }) {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    db.collection("lecturers")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setUserDetails(snapshot.data());
      });
  }, []);

  return (
    <div className="admin-container">
      <div className="admin">
        <div className="admin-bio">
          <div className="admin-bio-data">
            <span>
              <Avatar />
              {userDetails ? <p>{userDetails.username}</p> : <p>loading</p>}
            </span>
          </div>
          <span
            className="
        admin-add"
          >
            <p className="admin-bio-title">course</p>
            <Tooltip title="add new course">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </span>
          {userDetails.course ? (
            userDetails.course.map((course, id) => <p key={id}>{course}</p>)
          ) : (
            <p> loading</p>
          )}
          <span
            className="
        admin-add"
          >
            <p className="admin-bio-title">course units</p>
            <Tooltip title="add courseunit">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </span>
          {userDetails.courseunit ? (
            userDetails.courseunit.map((course, id) => <p key={id}>{course}</p>)
          ) : (
            <p> loading</p>
          )}
          <span
            className="
        admin-add"
          >
            <p className="admin-bio-title">lecture years</p>
            <Tooltip title="add year">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </span>
          {userDetails.lectureYear ? (
            userDetails.lectureYear.map((course, id) => (
              <p key={id}>{course}</p>
            ))
          ) : (
            <p> loading</p>
          )}
        </div>
        <div>
          <Announcement />
        </div>
      </div>
      <Summary />
    </div>
  );
}

export default LandingPage;
