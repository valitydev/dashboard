import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileModificationUnit, Modification } from '@vality/swag-claim-management';

import { Conversation } from '@dsh/api-codegen/messages';
import {
    isClaimModification,
    isCommentModificationUnit,
    isDocumentModificationUnit,
    isFileModificationUnit,
    SpecificClaimModificationUnit,
} from '@dsh/api/claims';

import { ConversationService } from './conversation.service';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;
    claimCreatedAt$ = this.conversationService.claimCreatedAt$;

    expandAll = false;

    constructor(private conversationService: ConversationService) {}

    isDocumentModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isDocumentModificationUnit(m.claimModificationType);
    }

    isCommentModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isCommentModificationUnit(m.claimModificationType);
    }

    isFileModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isFileModificationUnit(m.claimModificationType);
    }

    commentSaved(id: Conversation['conversationId']) {
        this.conversationService.commentSaved(id);
    }

    simpleTrackBy(index: number): number {
        return index;
    }

    deleteFile(m: SpecificClaimModificationUnit<FileModificationUnit>) {
        this.conversationService.deleteFile(m.claimModificationType.fileId);
    }
}
