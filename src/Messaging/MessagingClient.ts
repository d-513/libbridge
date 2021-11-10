import { Message } from "./Message";
import { MessagingChannel } from "./MessagingChannel";

type ReceiveCallback = (message: Message, from: string) => any;
type MessagingEvent = "message" | "delete" | "edit";
interface Listeners {
  message: ReceiveCallback[];
  delete: ReceiveCallback[];
  edit: ReceiveCallback[];
}

export class MessagingClient {
  name: string;
  channel: MessagingChannel;
  listeners: Listeners;
  constructor(name: string, channel: MessagingChannel) {
    this.name = name;
    this.channel = channel;
    this.listeners = {
      message: [],
      delete: [],
      edit: [],
    };
  }

  public on(event: MessagingEvent, cb: ReceiveCallback) {
    this.listeners[event].push(cb);
  }

  public send(event: MessagingEvent, message: Message) {
    this.channel.clients.forEach((client) => {
      if (client.name === this.name) return;
      client.listeners[event].forEach((listener) => {
        listener(message, this.name);
      });
    });
  }
}
