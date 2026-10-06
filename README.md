# @looloo/assistant

A reusable, standalone Angular chat window for Looloo applications. The interface is inspired by modern Jira/Rovo assistant panels and can be embedded in a full page, drawer, or modal.

## Install

```sh
npm install @looloo/assistant
```

The package expects Angular 21 and RxJS 7 as peer dependencies.

## Use

```ts
import { ChatConversation, ChatMessage, ChatWindowComponent } from '@looloo/assistant';

@Component({
  standalone: true,
  imports: [ChatWindowComponent],
  template: `
    <looloo-assistant-chat
      title="Looloo Assistant"
      [messages]="messages"
      [conversationHistory]="history"
      [activeConversationId]="activeConversationId"
      (sendMessage)="askAssistant($event)"
      (conversationSelected)="openConversation($event)"
      (newConversation)="resetChat()">
    </looloo-assistant-chat>
  `,
})
export class HelpPage {
  messages: ChatMessage[] = [];
  history: ChatConversation[] = [];
  activeConversationId: string | null = null;

  openConversation(conversation: ChatConversation): void {
    this.activeConversationId = conversation.id;
    // Load that conversation's messages into `messages`.
  }
  askAssistant(prompt: string): void {
    // Send prompt to your API, then append user and assistant messages.
  }
  resetChat(): void { this.messages = []; }
}
```

## Component API

| Input | Type | Purpose |
| --- | --- | --- |
| `title` | `string` | Assistant name shown in the panel |
| `subtitle` | `string` | Small header status/context label |
| `messages` | `ChatMessage[]` | Messages for the active conversation |
| `conversationHistory` | `ChatConversation[]` | Saved conversations shown in the sidebar |
| `activeConversationId` | `string \| null` | ID of the highlighted history item |
| `suggestions` | `ChatSuggestion[]` | Welcome screen prompt cards |
| `placeholder` | `string` | Composer placeholder |
| `disabled` | `boolean` | Disables composer and prompt cards |
| `showSidebar` | `boolean` | Shows the recent conversation sidebar |
| `welcomeTitle` | `string` | Welcome heading |
| `welcomeDescription` | `string` | Welcome supporting text |

Outputs: `sendMessage` emits submitted prompt text; `suggestionSelected` emits the chosen suggestion; `conversationSelected` emits the selected `ChatConversation`; `newConversation` emits when the sidebar action is clicked. The host application owns conversation state, persistence, and API calls.

`ChatConversation` has `id`, `title`, and optional `updatedAt`. The library displays the supplied history and active selection; load the selected conversation's messages in the host application.

`ChatMessage` has `id`, `role` (`assistant` or `user`), and `content`, with optional `time` and `author`. `ChatSuggestion` has `title`, `prompt`, optional `description`, and optional icon (`sparkles`, `search`, `lightbulb`, `chart`).

## Build

```sh
npm install
npm run build
```
