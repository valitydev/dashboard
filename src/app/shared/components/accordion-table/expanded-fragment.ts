import { inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import isNil from 'lodash-es/isNil';
import { Observable, BehaviorSubject, defer, of } from 'rxjs';
import { take, switchMap, shareReplay, map, tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';

import { Fragment } from '@dsh/app/shared';

const EMIT_LIMIT = 4;

export class ExpandedFragment<T extends { id: unknown } = { id: unknown }> {
    expanded$ = defer(() => this.expandedIndex$);

    private expandedIndex$ = new BehaviorSubject(0);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    constructor(
        private data$: Observable<T[]>,
        private more: () => void,
        private hasMore$: Observable<boolean> = of(true)
    ) {
        this.route.fragment
            .pipe(
                take(1),
                switchMap((fragment) =>
                    this.data$.pipe(
                        take(EMIT_LIMIT),
                        map((data) => (fragment ? data.findIndex((item) => this.serialize(item) === fragment) : -1)),
                        withLatestFrom(hasMore$),
                        tap(([index, hasMore]) => {
                            if (!isNil(fragment) && index === -1 && hasMore) {
                                more();
                            }
                        }),
                        map(([index]) => index)
                    )
                ),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef),
                shareReplay(1)
            )
            .subscribe((index) => {
                this.set(index);
            });
        this.expandedIndex$
            .pipe(
                withLatestFrom(this.data$),
                map(([index, data]) => this.serialize(data[index])),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((fragment) => this.router.navigate([], { fragment, queryParamsHandling: 'preserve' }));
    }

    set(expandedIndex: number) {
        this.expandedIndex$.next(expandedIndex);
    }

    private serialize(item?: T): Fragment {
        if (!item) return '';
        return String(item.id);
    }
}
