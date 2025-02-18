import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createControlProviders } from '@vality/ng-core';
import { Identity } from '@vality/swag-wallet';
import { combineLatest } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { IdentitiesService } from '@dsh/app/api/wallet';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-identity-filter',
    templateUrl: 'identity-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => IdentityFilterComponent),
    standalone: false
})
export class IdentityFilterComponent extends FilterSuperclass<Identity['id']> {
    identity$ = combineLatest([this.identitiesService.identities$, this.savedValue$]).pipe(
        map(([identities, value]) => identities.find((i) => i.id === value)),
        share(),
    );

    constructor(private identitiesService: IdentitiesService) {
        super();
    }
}
