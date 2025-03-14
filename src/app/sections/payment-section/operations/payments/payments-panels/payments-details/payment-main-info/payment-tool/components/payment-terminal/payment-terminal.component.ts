import { Component, Input } from '@angular/core';
import { PaymentTerminalDetails } from '@vality/swag-payments';

@Component({
    selector: 'dsh-payment-terminal',
    templateUrl: 'payment-terminal.component.html',
    standalone: false,
})
export class PaymentTerminalComponent {
    @Input() paymentTerminal: PaymentTerminalDetails;
}
