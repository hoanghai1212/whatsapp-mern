import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Avatar, IconButton } from "@material-ui/core";
import ChatMessage from "./ChatMessage/ChatMessage";

import classes from "./Chat.module.scss";
import { messagesService } from "../../services/MessagesService";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesService.sendMessage({
      message: input,
      name: "Hoang Hai",
      timestamp: "just now",
      received: false,
    });

    setInput("");
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <Avatar />
        <div className={classes.chat__headerInfo}>
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className={classes.chat__headerRight}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.chat__body}>
        {messages.map((message, index) => {
          return <ChatMessage key={new Date() + index} message={message} />;
        })}
      </div>

      <div className={classes.chat__footer}>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
