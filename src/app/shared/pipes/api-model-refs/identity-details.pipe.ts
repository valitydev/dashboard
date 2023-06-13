import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, takeUntil } from 'rxjs/operators';

import { IdentitiesService } from '@dsh/app/api/wallet';

@Pipe({
    name: 'identityDetails',
    pure: false,
})
export class IdentityDetailsPipe implements PipeTransform, OnDestroy {
    private identityName$: BehaviorSubject<string> = new BehaviorSubject('');
    private identityIDChange$: Subject<string> = new Subject();
    private destroy$: Subject<void> = new Subject();

    constructor(private identitiesService: IdentitiesService, private ref: ChangeDetectorRef) {
        combineLatest([this.identitiesService.identities$, this.identityIDChange$.pipe(distinctUntilChanged())])
            .pipe(
                takeUntil(this.destroy$),
                map(([identities, identityID]) => identities.find((s) => s.id === identityID)),
                pluck('name')
            )
            .subscribe((v) => {
                this.identityName$.next(v);
                this.ref.markForCheck();
            });
    }

    transform(identityID: string): string {
        this.identityIDChange$.next(identityID);
        return this.identityName$.value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
