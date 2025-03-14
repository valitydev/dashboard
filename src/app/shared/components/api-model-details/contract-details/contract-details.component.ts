import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contract } from '@vality/swag-payments';

@Component({
    selector: 'dsh-contract-details',
    templateUrl: 'contract-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ContractDetailsComponent {
    @Input() contract: Contract;
}
