import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { Webhook } from '@vality/swag-payments';
import sortBy from 'lodash-es/sortBy';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { WebhooksService } from '@dsh/app/api/payments';
import { mapToTimestamp, SHARE_REPLAY_CONF, progress } from '@dsh/app/custom-operators';

@Injectable()
export class ReceiveWebhooksService {
    private webhooksState$: BehaviorSubject<Webhook[]> = new BehaviorSubject(null);
    private receiveWebhooks$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    webhooks$: Observable<Webhook[]> = this.webhooksState$.pipe(
        filter((s) => !!s),
        map((w) => sortBy(w, (i) => !i.active)),
        shareReplay(SHARE_REPLAY_CONF),
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$: Observable<boolean> = progress(this.receiveWebhooks$, this.webhooks$).pipe(
        shareReplay(SHARE_REPLAY_CONF),
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    lastUpdated$: Observable<string> = this.webhooks$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private webhooksService: WebhooksService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {
        this.isLoading$.subscribe();

        this.receiveWebhooks$
            .pipe(
                switchMap(() =>
                    this.webhooksService.getWebhooksForParty().pipe(
                        catchError((err) => {
                            this.log.error(
                                err,
                                this.transloco.selectTranslate(
                                    'shared.httpError',
                                    null,
                                    'components',
                                ),
                            );
                            return of([]);
                        }),
                    ),
                ),
                map((webhooks) => webhooks.filter((webhook) => webhook.active)),
            )
            .subscribe((webhooks) => {
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
