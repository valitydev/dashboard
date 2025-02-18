import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LegalEntity } from '@vality/swag-payments';

@Component({
    selector: 'dsh-contractor-details',
    templateUrl: 'contractor-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContractorDetailsComponent {
    @Input() contractor: LegalEntity;
}
