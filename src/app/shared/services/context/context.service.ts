import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '@vality/swag-organizations';
import { Observable, ReplaySubject, EMPTY, concat, defer } from 'rxjs';
import { distinctUntilChanged, switchMap, shareReplay, catchError, map } from 'rxjs/operators';

import { OrgsService } from '@dsh/api/organizations';

@Injectable({
    providedIn: 'root',
})
export class ContextService {
    organization$: Observable<Organization> = concat(
        this.organizationsService.getContext().pipe(
            map(({ organizationId }) => organizationId),
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 404)
                    return this.organizationsService
                        .listOrgMembership({ limit: 1 })
                        .pipe(map(({ result }) => result[0].id));
                console.error(err);
                return EMPTY;
            })
        ),
        defer(() => this.switchOrganization$)
    ).pipe(
        distinctUntilChanged(),
        switchMap((organizationId) =>
            this.organizationsService
                .switchContext({ organizationSwitchRequest: { organizationId } })
                .pipe(map(() => organizationId))
        ),
        switchMap((orgId) => this.organizationsService.getOrg({ orgId })),
        shareReplay({ refCount: true, bufferSize: 1 })
    );

    private switchOrganization$ = new ReplaySubject<string>(1);

    constructor(private organizationsService: OrgsService) {}

    switchOrganization(organizationId: string): void {
        this.switchOrganization$.next(organizationId);
    }
}
