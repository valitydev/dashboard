import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService, DialogResponseStatus } from '@vality/matez';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { WebhooksService } from '@dsh/app/api/wallet';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { DeleteWebhookParams } from '../webhook-details/webhook-actions';

@Injectable()
export class DeleteWebhookService {
    private destroy$: Subject<void> = new Subject();
    private deleteWebhook$: Subject<DeleteWebhookParams> = new Subject();
    private deleted$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    webhookDeleted$: Observable<void> = this.deleted$.asObservable();

    constructor(
        private dialog: MatDialog,
        private walletWebhooksService: WebhooksService,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {}

    deleteWebhook(params: DeleteWebhookParams) {
        this.deleteWebhook$.next(params);
    }

    init() {
        this.deleteWebhook$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((params) =>
                    combineLatest([
                        of(params),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter((r) => r.status === DialogResponseStatus.Success)),
                    ]),
                ),
                switchMap(([{ webhookID, identityID }]) =>
                    this.walletWebhooksService.deleteWebhookByID({ webhookID, identityID }).pipe(
                        catchError((e) => {
                            this.log.error(
                                e,
                                this.transloco.selectTranslate(
                                    'webhooks.errors.deleteError',
                                    null,
                                    'wallet-section',
                                ),
                            );
                            return of('error');
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
            )
            .subscribe(() => this.deleted$.next());
    }

    destroy() {
        this.destroy$.next();
    }
}
