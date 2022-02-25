import React, { useState } from "react";
import "./Communicate.css";
import { Button, TextareaAutosize } from "@mui/material";
import { Send } from "@mui/icons-material";

function Communicate() {
  const [mesage, setMesage] = useState("");
  return (
    <div className="comm-root">
      <TextareaAutosize
        minRows={5}
        value={mesage}
        onChange={(e) => setMesage(e.target.value)}
        style={{ width: "90%" }}
      />
      <div>
        <Button variant="contained" color="primary" endIcon={<Send />}>
          {" "}
          send communication
        </Button>
      </div>
    </div>
  );
}

export default Communicate;
