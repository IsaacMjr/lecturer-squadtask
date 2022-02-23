import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { db } from "../../squad-config";
import { CircularProgress } from "@mui/material";
import DisplayStudents from "../displayStudents/DisplayStudents";

function Admin() {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState([
    {
      id: "",
      groupName: "",
      groupMembers: [],
    },
  ]);
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );

    db.collection("groups").onSnapshot((snapshot) => {
      setGroup(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          groupName: doc.data().groupName,
          groupMembers: doc.data().groupMembers,
        }))
      );
    });
  }, []);

  return (
    <div>
      <div className="admin">
        {/* <div className="admin-grpNo">
        {groups.length === 0 ? (
          <CircularProgress />
        ) : (
          <div className="admin-grNo-ct"> 
            <h3> number of groups</h3>
            <div>
              <p>{groups.length}</p>&nbsp;
              <p> groups</p>
            </div>
          </div>
        )}
      </div> */}
        <div className="admin-grpNo">
          {users.length === 0 ? (
            <CircularProgress />
          ) : (
            <div className="admin-grNo-ct">
              <h3> number of students</h3>
              <div>
                <p>{users.length}</p>&nbsp;
                <p> users</p>
              </div>
            </div>
          )}
        </div>
        <div className="admin-grpNo">
          <h2> number of grouped students</h2>
        </div>
      </div>
      {group ? <DisplayStudents groups={group} /> : <p>loading</p>}
    </div>
  );
}

export default Admin;
