import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createControlProviders } from '@vality/ng-core';
import { Identity } from '@vality/swag-wallet';

import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-identity-filter',
    templateUrl: 'identity-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => IdentityFilterComponent),
})
export class IdentityFilterComponent extends FilterSuperclass<Identity['id']> {}
