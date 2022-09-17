export interface PublishMessageDTO {
  topic: string;
  messages: { key?: string; value: string }[];
}
