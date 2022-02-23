import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db } from "../../squad-config";
import "./LandingPage.css";

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
    <div className="admin">
      <div className="admin-bio">
        <div className="admin-bio-data">
          <span>
            <Avatar />
            {userDetails ? <p>{userDetails.username}</p> : <p>loading</p>}
          </span>
        </div>
        <p className="admin-bio-title">course</p>
        {userDetails ? (
          userDetails.course.map((course, id) => <p key={id}>{course}</p>)
        ) : (
          <p> loading</p>
        )}
        <p className="admin-bio-title">course units</p>
        {userDetails ? (
          userDetails.courseunit.map((course, id) => <p key={id}>{course}</p>)
        ) : (
          <p> loading</p>
        )}
        <p className="admin-bio-title">lecture years</p>
        {userDetails ? (
          userDetails.lectureYear.map((course, id) => <p key={id}>{course}</p>)
        ) : (
          <p> loading</p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
