import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map, pluck, scan, shareReplay, switchMapTo } from 'rxjs/operators';

const DEFAULT_PAGINATION_LIMIT = 3;

@Injectable()
export class FakePaginatorService<T> {
    values$: Observable<T[]>;
    hasMore$: Observable<boolean>;

    private allValues$ = new ReplaySubject<T[]>(1);
    private paginationLimit$ = new ReplaySubject<number>(1);
    private showMore$ = new ReplaySubject<void>(1);
    private offset$ = this.showMore$.pipe(
        switchMapTo(this.paginationLimit$),
        scan((offset, limit) => offset + limit, 0),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    constructor() {
        this.values$ = combineLatest([this.allValues$, this.offset$]).pipe(
            map(([values, showedCount]) => values.slice(0, showedCount)),
            shareReplay({ refCount: true, bufferSize: 1 }),
        );
        this.hasMore$ = combineLatest([this.allValues$.pipe(pluck('length')), this.offset$]).pipe(
            map(([count, showedCount]) => count > showedCount),
            shareReplay({ refCount: true, bufferSize: 1 }),
        );
    }

    init(values: T[], paginationLimit: number = DEFAULT_PAGINATION_LIMIT) {
        this.allValues$.next(values);
        this.paginationLimit$.next(paginationLimit);
        this.showMore();
    }

    showMore() {
        this.showMore$.next();
    }
}
