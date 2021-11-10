import { MessageAttachment } from "./MessageAttachment";
import { MessageAuthor } from "./MessageAuthor";

export interface Message {
  text: string;
  author: MessageAuthor;
  attachments?: MessageAttachment[];
}
