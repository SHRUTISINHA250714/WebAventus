export enum MessageType {
  User = "user",
  Bot = "bot",
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: string;
}