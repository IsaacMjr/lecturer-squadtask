import React, { useState } from "react";
import "./Announcement.css";

// import material-ui components
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Announcement() {
  const [group, setGroup] = useState("");
  return (
    <div className="announce-admin">
      <FormControl style={{ width: "200px" }} variant="standard" size="small">
        <InputLabel id="group-select">select group</InputLabel>
        <Select
          id="group-select"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <MenuItem value="group1"> group1</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Announcement;
