import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { Claim } from '@vality/swag-claim-management';

import { FilterSuperclass } from '@dsh/components/filter';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-claim-filter',
    templateUrl: 'claim-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => ClaimFilterComponent)],
})
export class ClaimFilterComponent extends FilterSuperclass<Claim['id']> {
    constructor(injector: Injector) {
        super(injector);
    }
}
