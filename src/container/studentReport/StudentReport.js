import React, { useState, useEffect } from "react";
import "./StudentReport.css";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../squad-config";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";

function StudentReport() {
  const { groupId, memberName } = useParams();
  const [reviewInfo, setReviewInfo] = useState([]);
  useEffect(() => {
    db.collection("groups")
      .doc(groupId)
      .collection("reviews")
      .where("reviewedPerson", "==", memberName)
      .onSnapshot((snapshot) =>
        setReviewInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);
  const navigate = useNavigate();
  //   console.log(useNavigate());

  const [openBackdrop, setOpenBack] = useState(true);

  const closeBackdrop = () => {
    navigate("/");
  };
  return (
    <Backdrop open={openBackdrop} style={{ zIndex: "1" }}>
      <div className="main-student">
        <p className="main-student-name">{memberName}</p>
        {reviewInfo.length === 0 ? (
          <p>loading</p>
        ) : (
          reviewInfo.map((review, id) => (
            <div className="main-student-details" key={id}>
              <p className=" main-students-reviewer">{review.reviewer}</p>
              <p> {review.reviewMessage}</p>
              <span>
                <Rating value={review.reviewRating} readOnly />
                &#40;{review.reviewRating}&#41;
              </span>
            </div>
          ))
        )}
        <div className="main-close">
          <IconButton onClick={closeBackdrop} color="secondary">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </Backdrop>
  );
}

export default StudentReport;
