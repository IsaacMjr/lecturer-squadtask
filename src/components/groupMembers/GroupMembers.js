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
                <h4> {info.groupId} &nbsp;members</h4>
                {members ? (
                  members.map((member, id) => (
                    <p key={id}>{member.memberName}</p>
                  ))
                ) : (
                  <p> no group member yet</p>
                )}
              </div>
            );
          })
      ) : (
        <div className="grpErr">
          <h4> select from menu to display participants</h4>
        </div>
      )}
    </div>
  );
}

export default GroupMembers;
