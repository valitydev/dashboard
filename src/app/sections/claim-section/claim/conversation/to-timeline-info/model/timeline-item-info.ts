import { Modification, UserInfo } from '@vality/swag-claim-management';

import { TimelineAction } from './timeline-action';

export interface TimelineItemInfo {
    action: TimelineAction;
    userInfo: UserInfo;
    createdAt: string;
    modifications: Modification[];
}
