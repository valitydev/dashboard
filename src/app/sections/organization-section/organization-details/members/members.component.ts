import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, switchMap } from 'rxjs/operators';

import { OrgsService } from '@dsh/app/api/organizations';

import { FetchMembersService } from './services/fetch-members/fetch-members.service';
import { MembersExpandedIdManager } from './services/members-expanded-id-manager/members-expanded-id-manager.service';

@Component({
    selector: 'dsh-members',
    templateUrl: 'members.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchMembersService, MembersExpandedIdManager],
    standalone: false,
})
export class MembersComponent {
    organization$ = this.route.params.pipe(
        switchMap(({ orgId }) => this.organizationsService.getOrg({ orgId })),
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );
    members$ = this.fetchMembersService.members$;
    lastUpdated$ = this.fetchMembersService.lastUpdated$;
    isLoading$ = this.fetchMembersService.isLoading$;

    constructor(
        private organizationsService: OrgsService,
        private fetchMembersService: FetchMembersService,
        private route: ActivatedRoute,
        private dr: DestroyRef,
    ) {}

    refresh() {
        this.fetchMembersService.load();
    }
}
