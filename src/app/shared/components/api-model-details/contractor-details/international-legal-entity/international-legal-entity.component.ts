import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InternationalLegalEntity } from '@vality/swag-payments';

@Component({
    selector: 'dsh-international-legal-entity',
    templateUrl: 'international-legal-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class InternationalLegalEntityComponent {
    @Input() internationalLegalEntity: InternationalLegalEntity;
}
