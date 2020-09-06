import React from "react";
import classes from "./ChatMessage.module.scss";
function ChatMessage({ message }) {
  return (
    <p
      className={[
        classes.chatMessage,
        message.received && classes.receiver,
      ].join(" ")}
    >
      <span className={classes.chatMessage__name}>{message.name}</span>
      {message.message}
      <span className={classes.chatMessage__timestamp}>
        {message.timestamp}
      </span>
    </p>
  );
}

export default ChatMessage;
