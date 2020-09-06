//importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./dbMessages.js";
import cors from "cors";

// app config
const app = express();
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1067448",
  key: "5e87b23081bb903e679e",
  secret: "cf6d47c33f7fff00b1d3",
  cluster: "ap1",
  encrypted: true,
});

// middleware
app.use(express.json());

app.use(cors());

// DB config
const connection_URL =
  "mongodb+srv://admin:9dUycE9DjG7Uncb@cluster0.2gkkd.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));
