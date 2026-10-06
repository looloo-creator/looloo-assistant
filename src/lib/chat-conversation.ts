/** A saved conversation entry displayed in the chat history sidebar. */
export interface ChatConversation {
  id: string;
  title: string;
  /** Optional human-readable date or time label. */
  updatedAt?: string;
}
