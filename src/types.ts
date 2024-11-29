// src/types.ts

import { v4 as uuidv4 } from 'uuid';

export type AIMessage =
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }
  | { role: 'assistant'; content: string; id?: string };

export type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: string;
};
