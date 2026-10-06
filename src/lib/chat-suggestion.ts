export interface ChatSuggestion {
  title: string;
  prompt: string;
  /** Optional short explanation shown on the suggestion card. */
  description?: string;
  icon?: 'sparkles' | 'search' | 'lightbulb' | 'chart';
}
