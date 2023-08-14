import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Identity } from '@vality/swag-wallet';
import { map } from 'rxjs/operators';

import { IdentitiesService } from '@dsh/app/api/wallet';

@Pipe({
    name: 'identityName',
    standalone: true,
    pure: false,
})
export class IdentityNamePipe implements PipeTransform {
    async = new AsyncPipe(this.cdr);

    constructor(
        private cdr: ChangeDetectorRef,
        private identitiesService: IdentitiesService,
    ) {}

    transform(id: Identity['id']): Identity['name'] {
        return this.async.transform(
            this.identitiesService.identities$.pipe(
                map((identities) => identities.find((identity) => identity.id === id)?.name || id),
            ),
        );
    }
}
