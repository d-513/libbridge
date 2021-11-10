import { Message } from "./Message";
import { MessagingClient } from "./MessagingClient";

export class MessagingChannel {
  name: string;
  clients: MessagingClient[];
  constructor(channel: string) {
    this.name = channel;
    this.clients = [];
  }

  public registerClient(name: string) {
    const client = new MessagingClient(name, this);
    this.clients.push(client);
    return client;
  }
}
