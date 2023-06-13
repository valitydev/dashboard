import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { IdentitiesService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-webhook-row',
    templateUrl: 'webhook-row.component.html',
    styleUrls: ['webhook-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookRowComponent {
    @Input()
    url: string;

    @Input()
    identityID: string;

    constructor(private identitiesService: IdentitiesService) {}

    getIdentityName(identityID: string) {
        return this.identitiesService.identities$.pipe(map((i) => i.find(({ id }) => id === identityID)?.name));
    }
}
