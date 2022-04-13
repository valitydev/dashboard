import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Webhook } from '@vality/swag-wallet';
import sortBy from 'lodash-es/sortBy';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { IdentitiesService, WebhooksService } from '@dsh/api/wallet';

import { mapToTimestamp, SHARE_REPLAY_CONF, progress } from '../../../../custom-operators';

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
        private walletWebhooksService: WebhooksService,
        private identitiesService: IdentitiesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.receiveWebhooks$
            .pipe(
                switchMap(() => this.identitiesService.identities$),
                map((identities) => identities.map((identity) => identity.id)),
                switchMap((ids) =>
                    forkJoin(ids.map((identityID) => this.walletWebhooksService.getWebhooks({ identityID }))).pipe(
                        catchError((err) => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            return of([]);
                        })
                    )
                ),
                map((webhooks) => webhooks.flat())
            )
            .subscribe((webhooks) => {
                this.webhooksState$.next(webhooks);
            });
    }

    receiveWebhooks() {
        this.receiveWebhooks$.next();
    }
}
