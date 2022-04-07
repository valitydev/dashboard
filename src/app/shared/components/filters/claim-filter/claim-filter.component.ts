import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';
import { Claim } from '@vality/swag-payments';

import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-claim-filter',
    templateUrl: 'claim-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(ClaimFilterComponent)],
})
export class ClaimFilterComponent extends FilterSuperclass<Claim['id']> {
    constructor(injector: Injector) {
        super(injector);
    }
}
