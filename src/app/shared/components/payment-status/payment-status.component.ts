import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentSearchResult } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { StatusModule } from '@dsh/components/indicators';

import { PAYMENT_STATUS_COLOR } from './payment-status-color';

@Component({
    selector: 'dsh-payment-status',
    templateUrl: './payment-status.component.html',
    imports: [CommonModule, StatusModule],
})
export class PaymentStatusComponent {
    @Input() status: PaymentSearchResult.StatusEnum;

    paymentStatusDict$ = this.anapiDictionaryService.paymentStatus$;
    statusColor = PAYMENT_STATUS_COLOR;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {}
}
