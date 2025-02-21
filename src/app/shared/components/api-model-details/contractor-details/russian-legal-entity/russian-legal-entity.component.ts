import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RussianLegalEntity } from '@vality/swag-payments';

@Component({
    selector: 'dsh-russian-legal-entity',
    templateUrl: 'russian-legal-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class RussianLegalEntityComponent {
    @Input() russianLegalEntity: RussianLegalEntity;
}
