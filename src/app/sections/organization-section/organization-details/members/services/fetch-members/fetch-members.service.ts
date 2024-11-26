import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@vality/swag-organizations';
import { BehaviorSubject, defer, of } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap, switchMapTo } from 'rxjs/operators';

import { MembersService } from '@dsh/app/api/organizations';
import { mapToTimestamp, progress } from '@dsh/app/custom-operators';
import { ErrorService } from '@dsh/app/shared';

@Injectable()
export class FetchMembersService {
    members$ = defer(() => this.loadMembers$).pipe(
        switchMapTo(this.route.params),
        switchMap(({ orgId }) =>
            this.membersService.listOrgMembers({ orgId }).pipe(
                pluck('result'),
                catchError((err) => {
                    this.errorService.error(err);
                    return of([] as Member[]);
                }),
            ),
        ),
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );
    lastUpdated$ = this.members$.pipe(mapToTimestamp, takeUntilDestroyed(this.dr), shareReplay(1));
    isLoading$ = defer(() => progress(this.loadMembers$, this.members$)).pipe(
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );

    private loadMembers$ = new BehaviorSubject<void>(undefined);

    constructor(
        private membersService: MembersService,
        private errorService: ErrorService,
        private route: ActivatedRoute,
        private dr: DestroyRef,
    ) {}

    load() {
        this.loadMembers$.next();
    }
}
