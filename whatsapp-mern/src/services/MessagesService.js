import axios from "./axios";

export class MessagesService {
  fetchAllMessages = () => {
    return axios.get("/api/v1/messages/sync");
  };

  sendMessage = (message) => {
    return axios.post("/api/v1/messages/new", message);
  };
}

export const messagesService = new MessagesService();
