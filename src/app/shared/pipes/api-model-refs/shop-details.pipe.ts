import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { ShopsDataService } from '@dsh/app/shared';

@Pipe({
    name: 'shopDetails',
    pure: false,
    standalone: false,
})
export class ShopDetailsPipe implements PipeTransform, OnDestroy {
    private shopName$: BehaviorSubject<string> = new BehaviorSubject('');
    private shopIDChange$: Subject<string> = new Subject();
    private destroy$: Subject<void> = new Subject();

    constructor(
        private shopsDataService: ShopsDataService,
        private ref: ChangeDetectorRef,
    ) {
        combineLatest([
            this.shopsDataService.shops$,
            this.shopIDChange$.pipe(distinctUntilChanged()),
        ])
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ([shops, shopID]) =>
                        shops.find((s) => s.id === shopID)?.details?.name || shopID,
                ),
            )
            .subscribe((v) => {
                this.shopName$.next(v);
                this.ref.markForCheck();
            });
    }

    transform(shopID: string): string {
        this.shopIDChange$.next(shopID);
        return this.shopName$.value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
