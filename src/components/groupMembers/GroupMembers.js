import React from "react";

import "./GroupMembers.css";

function GroupMembers({ group, groupInfo }) {
  return (
    <div className="grpMem">
      {groupInfo && group ? (
        groupInfo
          .filter((info) => info.groupId == group)
          .map((info, id) => {
            const members = info.groupMembers;
            return (
              <div className="grpMain" key={id}>
                <h2> {info.groupId} &nbsp;members</h2>
                {members.map((member, id) => (
                  <p key={id}>{member.memberName}</p>
                ))}
              </div>
            );
          })
      ) : (
        <div className="grpErr">
          <h4> loading</h4>
        </div>
      )}
    </div>
  );
}

export default GroupMembers;
