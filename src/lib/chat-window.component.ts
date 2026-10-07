import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatConversation } from './chat-conversation';
import { ChatMessage } from './chat-message';
import { ChatSuggestion } from './chat-suggestion';

@Component({
  selector: 'looloo-assistant-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
  @Input() title = 'Looloo AI';
  @Input() subtitle = 'Your AI assistant';
  @Input() messages: ChatMessage[] = [];
  @Input() conversationHistory: ChatConversation[] = [];
  @Input() activeConversationId: string | null = null;
  @Input() suggestions: ChatSuggestion[] = [
    { title: 'Plan a trip', description: 'Build an itinerary from your ideas', prompt: 'Help me plan a trip', icon: 'sparkles' },
    { title: 'Find a place', description: 'Discover somewhere worth visiting', prompt: 'Help me find a place to visit', icon: 'search' },
    { title: 'Get inspired', description: 'Ideas for your next adventure', prompt: 'Give me some travel inspiration', icon: 'lightbulb' },
  ];
  @Input() placeholder = 'Ask anything…';
  @Input() disabled = false;
  @Input() showSidebar = true;
  @Input() welcomeTitle = 'Where would you like to come?';
  @Input() welcomeDescription = 'Ask me anything, or choose a suggestion to get started.';

  @Output() readonly sendMessage = new EventEmitter<string>();
  @Output() readonly suggestionSelected = new EventEmitter<ChatSuggestion>();
  @Output() readonly newConversation = new EventEmitter<void>();
  @Output() readonly conversationSelected = new EventEmitter<ChatConversation>();

  draft = '';

  submit(): void {
    const message = this.draft.trim();
    if (!message || this.disabled) return;
    this.sendMessage.emit(message);
    this.draft = '';
  }

  chooseSuggestion(suggestion: ChatSuggestion): void {
    this.suggestionSelected.emit(suggestion);
    this.sendMessage.emit(suggestion.prompt);
  }

  startNewConversation(): void {
    this.newConversation.emit();
  }

  selectConversation(conversation: ChatConversation): void {
    this.conversationSelected.emit(conversation);
  }

  trackMessage(_index: number, message: ChatMessage): string { return message.id; }
  trackConversation(_index: number, conversation: ChatConversation): string { return conversation.id; }
  trackSuggestion(_index: number, suggestion: ChatSuggestion): string { return suggestion.title; }
}
