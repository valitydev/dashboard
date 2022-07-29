import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FileModificationUnit, Modification } from '@vality/swag-claim-management';
import { Conversation } from '@vality/swag-messages';

import {
    isClaimModification,
    isCommentModificationUnit,
    isFileModificationUnit,
    SpecificClaimModificationUnit,
} from '@dsh/api/claim-management';

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
    timelineActionLabels = this.getTimelineActionLabels();

    expandAll = false;

    constructor(private conversationService: ConversationService, private transloco: TranslocoService) {}

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

    private getTimelineActionLabels() {
        return {
            changesAdded: this.transloco.selectTranslate(
                'conversation.timelineActions.changesAdded',
                null,
                'claim-section'
            ),
            commentAdded: this.transloco.selectTranslate(
                'conversation.timelineActions.commentAdded',
                null,
                'claim-section'
            ),
            filesAdded: this.transloco.selectTranslate(
                'conversation.timelineActions.filesAdded',
                null,
                'claim-section'
            ),
            statusAccepted: this.transloco.selectTranslate(
                'conversation.timelineActions.statusAccepted',
                null,
                'claim-section'
            ),
            statusDenied: this.transloco.selectTranslate(
                'conversation.timelineActions.statusDenied',
                null,
                'claim-section'
            ),
            statusPending: this.transloco.selectTranslate(
                'conversation.timelineActions.statusPending',
                null,
                'claim-section'
            ),
            statusReview: this.transloco.selectTranslate(
                'conversation.timelineActions.statusReview',
                null,
                'claim-section'
            ),
            statusRevoked: this.transloco.selectTranslate(
                'conversation.timelineActions.statusRevoked',
                null,
                'claim-section'
            ),
        };
    }
}
