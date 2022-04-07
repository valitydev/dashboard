import { ConversationParam } from '@vality/swag-messages';
import { v4 as uuid } from 'uuid';

export const createSingleMessageConversationParams = (conversationId: string, text: string): ConversationParam[] => [
    { conversationId, messages: [{ messageId: uuid(), text }] },
];
