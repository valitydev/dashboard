import { Component, Inject, Input, OnChanges } from '@angular/core';

import { RefundSearchResult, RefundStatus } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor as Color } from '../../../../theme-manager';
import { StatusViewInfo } from '../../status-details-item';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-refund-item',
    templateUrl: './refund-item.component.html'
})
export class RefundItemComponent implements OnChanges {
    @Input() refund: RefundSearchResult;

    localePath = 'sections.paymentDetails.refunds.refundItem';

    statusViewInfo: StatusViewInfo;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges() {
        this.statusViewInfo = this.getStatusViewInfo(this.refund.status, `common.refundStatus`);
    }

    getStatusViewInfo(status: RefundStatus.StatusEnum, localePath: string): StatusViewInfo {
        const statusEnum = RefundStatus.StatusEnum;
        switch (status) {
            case statusEnum.Succeeded:
                return { color: Color.success, text: `${localePath}.succeeded` };
            case statusEnum.Failed:
                return { color: Color.warn, text: `${localePath}.failed` };
            case statusEnum.Pending:
                return { color: Color.pending, text: `${localePath}.pending` };
        }
    }
}