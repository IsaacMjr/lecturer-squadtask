import React, { useState, useEffect } from "react";
import { db } from "../../squad-config";
import "./LandingPage.css";
import Announcement from "../announce/Announcement";

// material-ui components
import { Avatar, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Summary from "../../container/summaryData/Summary";
import GroupMembers from "../groupMembers/GroupMembers";

function LandingPage({ user }) {
  const [userDetails, setUserDetails] = useState([]);
  const [courseunit, setCourseUnit] = useState([]);
  useEffect(() => {
    db.collection("lecturers")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setUserDetails(snapshot.data());
      });
  }, []);

  // experiment
  const fetchCuStudents = (courseunit) => {
    db.collection("users")
      .where("courseunit", "==", courseunit)
      .onSnapshot((snapshot) => {
        setCourseUnit(snapshot.docs.map((doc) => doc.data()));
      });
  };
  // userDetails.courseunit.map((unit, id) => console.log(unit));

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
            userDetails.courseunit.map((courseNt, id) => (
              <div key={id} className="admin-C-units">
                {courseNt}
                <button onClick={() => fetchCuStudents(courseNt)}>
                  {" "}
                  select
                </button>
              </div>
            ))
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
        <div>
          <GroupMembers />
        </div>
      </div>
      <Summary courseunit={courseunit} />
    </div>
  );
}

export default LandingPage;
