import React from "react";
import "./DisplayStudents.css";
import { Link } from "react-router-dom";

// import material-ui components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  acc: {
    width: "50vw",
  },
  accSum: {
    justifyContent: "space-evenly",
    backgroundColor: "black",
  },
});

function DisplayStudents({ groups }) {
  const classes = useStyles();
  // const [reviews, setReviews] = useState([]);

  return (
    <div className="main">
      <div className="main-acc">
        <p> displays students</p>
        {groups.map((group) => {
          return group.groupMembers.map((member, id) => (
            <Accordion className={classes.acc} key={id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accSum}
              >
                <Link to={`/${group.id}/${member.memberName}`}>
                  <Typography>{member.memberName}</Typography>
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                <div className="main-category">
                  <p className="cat-name">{group.groupName}</p>
                </div>
              </AccordionDetails>
            </Accordion>
          ));
        })}
      </div>
    </div>
  );
}

export default DisplayStudents;
