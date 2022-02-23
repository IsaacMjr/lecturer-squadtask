import React, { useState } from "react";
import "./Summary.css";

// material-ui components
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

function Summary() {
  const [numberPart, setNumberPart] = useState(0);
  // testing number of groups
  const testNumberOfGroups = Math.floor(20 / numberPart);
  return (
    <div className="sum">
      <h1> create groups manually</h1>
      <div>
        <p> number of student doing research methodology</p>
        <h3>5</h3>
      </div>
      <div>
        <p> number of groups doing research methodology</p>
        <h3>5</h3>
      </div>
      <h2>manually create groups</h2>
      <div>
        <p>number of participants per group</p>
        <TextField
          size="small"
          type="number"
          value={numberPart}
          onChange={(e) => setNumberPart(e.target.value)}
        />
      </div>
      <div>
        possible number of groups &nbsp;{" "}
        {numberPart <= 0 ? <p>0</p> : testNumberOfGroups}
      </div>
      <Button variant="contained" color="primary">
        {" "}
        create groups
      </Button>
    </div>
  );
}

export default Summary;
