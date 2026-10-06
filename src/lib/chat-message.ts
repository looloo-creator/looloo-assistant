export type ChatMessageRole = 'assistant' | 'user';

export interface ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  /** Optional time label, for example "10:42 AM". */
  time?: string;
  /** Optional assistant attribution shown below a response. */
  author?: string;
}
