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
import Complaints from "../complaints/Complaints";

function LandingPage({ user }) {
  const [userDetails, setUserDetails] = useState([]);
  const [courseunit, setCourseUnit] = useState([]);
  const [groupInfo, setGroupInfo] = useState([]);

  // group props
  const [group, setGroup] = useState("");

  // fetch data from the groups
  useEffect(() => {
    if (user.uid) {
      db.collection("lecturers")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setUserDetails(snapshot.data());
        });
    }
    db.collection("lecturers")
      .doc(user.uid)
      .collection("groups")
      .onSnapshot((snapshot) => {
        setGroupInfo(snapshot.docs.map((doc) => doc.data()));
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
          <Announcement
            groupInfo={groupInfo}
            group={group}
            setGroup={setGroup}
          />
        </div>
        <div>
          <GroupMembers group={group} groupInfo={groupInfo} />
        </div>
      </div>
      <div className="admin-botm">
        <Summary courseunit={courseunit} />
        <Complaints />
      </div>
    </div>
  );
}

export default LandingPage;
