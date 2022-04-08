import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrgsService } from '@dsh/api/organizations';

const LINKS: { path: string }[] = [
    {
        path: 'members',
    },
    {
        path: 'invitations',
    },
];

@Component({
    selector: 'dsh-organization-details',
    templateUrl: 'organization-details.component.html',
    styleUrls: ['organization-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationDetailsComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg(orgId)),
        shareReplay(1)
    );
    readonly links = LINKS;

    constructor(private organizationsService: OrgsService, private route: ActivatedRoute) {}
}
