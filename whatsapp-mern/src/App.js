import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar/Sidebar";
import Chat from "./component/Chat/Chat";
import Pusher from "pusher-js";
import classes from "./App.module.scss";
import { messagesService } from "./services/MessagesService";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messagesService
      .fetchAllMessages()
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("5e87b23081bb903e679e", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind();
      channel.unsubscribe("messages");
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className={classes.app}>
      <div className={classes.app__body}>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
