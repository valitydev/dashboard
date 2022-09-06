import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { PaymentStatus } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import isObject from 'lodash-es/isObject';

import { AnapiDictionaryService } from '@dsh/api/anapi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { StatusColor } from '../../../../../../../../../theme-manager';
import { getPaymentStatusInfo } from '../../../../../../../../get-payment-status-info';

@Component({
    selector: 'dsh-payment-status',
    templateUrl: './payment-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatusComponent implements OnChanges {
    @Input() status: PaymentStatus.StatusEnum;

    paymentColor: StatusColor;
    paymentStatus: string;
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
        const { status, color } = getPaymentStatusInfo(paymentStatus);
        this.paymentColor = color;
        this.paymentStatus = status;
    }
}
