import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Webhook } from '@vality/swag-payments';
import sortBy from 'lodash-es/sortBy';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { WebhooksService } from '@dsh/api/payments';
import { mapToTimestamp, SHARE_REPLAY_CONF, progress } from '@dsh/operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter((s) => !!s),
        map((w) => sortBy(w, (i) => !i.active)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooks$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    lastUpdated$: Observable<string> = this.webhooks$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.isLoading$.subscribe();

        this.receiveWebhooks$
            .pipe(
                switchMap(() =>
                    this.webhooksService.getWebhooksForParty().pipe(
                        catchError((err) => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('shared.httpError', null, 'components'), 'OK');
                            return of([]);
                        })
                    )
                ),
                map((webhooks) => webhooks.filter((webhook) => webhook.active))
            )
            .subscribe((webhooks) => {
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
