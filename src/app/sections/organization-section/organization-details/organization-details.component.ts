import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';

@Component({
    selector: 'dsh-organization-details',
    templateUrl: 'organization-details.component.html',
    styleUrls: ['organization-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDetailsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg({ orgId })),
        shareReplay(1),
    );
    readonly links: { path: string; label$: Observable<string> }[] = [
        {
            path: 'members',
            label$: this.transloco.selectTranslate(
                'organizationDetails.links.members',
                null,
                'organization-section',
            ),
        },
        {
            path: 'invitations',
            label$: this.transloco.selectTranslate(
                'organizationDetails.links.invitations',
                null,
                'organization-section',
            ),
        },
    ];

    constructor(
        private organizationsService: OrgsService,
        private route: ActivatedRoute,
        private transloco: TranslocoService,
    ) {}
}
