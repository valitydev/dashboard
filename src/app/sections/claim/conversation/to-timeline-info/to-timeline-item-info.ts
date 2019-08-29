import {
    ModificationUnit,
    Modification,
    ClaimModification,
    PartyModification
} from '../../../../api-codegen/claim-management';
import { TimelineAction } from './timeline-action';
import { getClaimModificationTimelineAction } from './get-claim-modification-timeline-action';
import { getPartyModificationTimelineAction } from './get-party-modification-timeline-action';
import { SpecificModificationUnit } from './specific-modification-unit';
import { TimelineItemInfo } from './timeline-item-info';
import { getTimelineActionColor } from './get-timeline-action-color';
import { Author } from './author';

function getUnitTimelineAction(unit: ModificationUnit): TimelineAction {
    switch (unit.modification.modificationType) {
        case Modification.ModificationTypeEnum.ClaimModification:
            return getClaimModificationTimelineAction(unit as SpecificModificationUnit<ClaimModification>);
        case Modification.ModificationTypeEnum.PartyModification:
            return getPartyModificationTimelineAction(unit as SpecificModificationUnit<PartyModification>);
    }
    console.error('Modification unidentified');
}

export function toTimelineItemInfo(batch: ModificationUnit[]): TimelineItemInfo {
    const [firstUnit] = batch;
    const lastUnit = batch[batch.length - 1];
    const action = getUnitTimelineAction(firstUnit);
    return {
        action,
        author: Author.manager,
        createdAt: lastUnit.createdAt as any,
        color: getTimelineActionColor(action)
    };
}