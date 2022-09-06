import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';

import { AnapiDictionaryService } from '@dsh/api/anapi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { StatusColor } from '../../../../../../../../../theme-manager';
import { getPaymentStatusColor } from '../../../../../../../../get-payment-status-color';

@Component({
    selector: 'dsh-payment-status',
    templateUrl: './payment-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatusComponent implements OnChanges {
    @Input() status: PaymentSearchResult.StatusEnum;

    paymentColor: StatusColor;
    paymentStatusDict$ = this.anapiDictionaryService.paymentStatus$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}

    ngOnChanges(changes: ComponentChanges<PaymentStatusComponent>): void {
        if (isObject(changes.status)) {
            this.updateStatusInfo(changes.status);
        }
    }

    private updateStatusInfo({ currentValue: paymentStatus }: ComponentChange<PaymentStatusComponent, 'status'>): void {
        if (isNil(paymentStatus)) {
            return;
        }
        this.paymentColor = getPaymentStatusColor(paymentStatus);
    }
}
