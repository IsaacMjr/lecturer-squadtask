import React from "react";
import "./Announcement.css";

// import material-ui components
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Communicate from "../../container/communicate/Communicate";

function Announcement({ groupInfo, group, setGroup }) {
  return (
    <div className="announce-admin">
      <FormControl style={{ width: "200px" }} variant="standard" size="small">
        <InputLabel id="group-select">select group</InputLabel>
        <Select
          id="group-select"
          value={group.id}
          onChange={(e) => setGroup(e.target.value)}
        >
          {groupInfo.length !== 0 ? (
            groupInfo.map((grpInfo, id) => {
              return (
                <MenuItem value={grpInfo.groupId} key={id}>
                  {grpInfo.groupName}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem> groups</MenuItem>
          )}
        </Select>
      </FormControl>
      <Communicate />
    </div>
  );
}

export default Announcement;
