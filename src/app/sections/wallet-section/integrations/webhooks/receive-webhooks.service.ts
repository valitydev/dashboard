import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { Webhook } from '@vality/swag-wallets';
import sortBy from 'lodash-es/sortBy';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { WebhooksService } from '@dsh/app/api/wallet';

import { mapToTimestamp, progress } from '../../../../custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<void> = new Subject();

    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter((s) => !!s),
        map((w) => sortBy(w, (i) => !i.active)),
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooks$).pipe(
        shareReplay({ refCount: true, bufferSize: 1 }),
    );

    lastUpdated$: Observable<string> = this.webhooks$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private walletWebhooksService: WebhooksService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {
        this.receiveWebhooks$
            .pipe(
                switchMap(() =>
                    this.walletWebhooksService.getWebhooks().pipe(
                        catchError((err) => {
                            this.log.error(
                                err,
                                this.transloco.selectTranslate(
                                    'shared.httpError',
                                    null,
                                    'components',
                                ),
                            );
                            return of<Webhook[]>([]);
                        }),
                    ),
                ),
            )
            .subscribe((webhooks) => {
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
