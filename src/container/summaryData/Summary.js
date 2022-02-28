import React, { useState, useEffect } from "react";
import "./Summary.css";
import { db, auth } from "../../squad-config";

// material-ui components
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

function Summary({ courseunit }) {
  const [numberPart, setNumberPart] = useState(0); //number of participants per group
  // testing number of groups
  const testNumberOfGroups = Math.floor(courseunit.length / numberPart);

  //   fetch number of groups in a courseunit
  const [numberOfGroups, setNumberOfGroups] = useState([]);
  useEffect(() => {
    if (courseunit.length !== 0) {
      db.collection("lecturers")
        .doc(auth.currentUser.uid)
        .collection("groups")
        .where("groupCourseunit", "==", courseunit[0].courseunit)
        .onSnapshot((snapshot) => {
          setNumberOfGroups(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [courseunit]);

  //   function to create groups

  const createGroup = () => {
    for (let i = 0; i < testNumberOfGroups; i++) {
      const randomId = Math.floor(Math.random() * 1000);
      db.collection("groups")
        .doc(`group-${randomId}`)
        .set({
          groupName: `group-${randomId}`,
          groupCourseunit: courseunit[0].courseunit,
          groupLogo:
            "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png",
          groupId: `group-${randomId}`,
          groupNumber: numberPart,
          groupMembers: [],
          memberTraits: [],
          createdBy: auth.currentUser.uid,
        })
        .then(() => {
          alert(`${testNumberOfGroups} group(s) created`);
          setNumberPart(0);
        })
        .catch((error) => alert(error.message));

      //   testArr.push(`group${randomId}`);
    }
  };

  return (
    <div className="sum">
      <h2> create groups manually</h2>
      <div>
        {courseunit.courseunit ? (
          <p> number of student doing {courseunit[0].courseunit}</p>
        ) : (
          <p> number of students doing selected courseunit</p>
        )}
        {courseunit ? <h3>{courseunit.length}</h3> : <h3>0</h3>}
      </div>
      <div>
        {courseunit.courseunit ? (
          <p> number of groups doing {courseunit[0].courseunit}</p>
        ) : (
          <p> number of groups doing selected courseunit</p>
        )}

        {numberOfGroups.length === 0 ? (
          <h3>0</h3>
        ) : (
          <h3>{numberOfGroups.length}</h3>
        )}
      </div>
      <h3>assign number of students per group</h3>
      <div>
        <p>number of participants per group</p>
        <TextField
          size="small"
          type="number"
          value={numberPart}
          onChange={(e) => setNumberPart(e.target.value)}
        />
      </div>
      <div className="sum-grpNum">
        possible number of groups &nbsp;{" "}
        {numberPart <= 0 ? <p>0</p> : testNumberOfGroups}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={createGroup}
        disabled={!numberPart || numberPart <= 0}
      >
        {" "}
        create groups
      </Button>
    </div>
  );
}

export default Summary;
