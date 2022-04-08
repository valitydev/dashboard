import { FileModification } from '@vality/swag-claim-management';
import { Conversation } from '@vality/swag-messages';

export interface UpdateParams {
    type: 'updateConversation' | 'updateFiles';
}

export interface UpdateConversationParams extends UpdateParams {
    conversationId: Conversation['conversationId'];
}

export interface UpdateFilesParams extends UpdateParams {
    fileIds: string[];
    fileModificationType: FileModification.FileModificationTypeEnum;
}
