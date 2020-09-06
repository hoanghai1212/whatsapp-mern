import React from "react";
import classes from "./SidebarChat.module.scss";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className={classes.sidebarChat}>
      <Avatar />
      <div className={classes.sidebarChat__info}>
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
}

export default SidebarChat;
