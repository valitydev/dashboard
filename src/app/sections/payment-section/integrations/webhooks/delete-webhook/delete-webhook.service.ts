import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService, DialogResponseStatus } from '@vality/matez';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { WebhooksService } from '@dsh/app/api/payments';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

@Injectable()
export class DeleteWebhookService {
    private destroy$: Subject<void> = new Subject();
    private deleteWebhook$: Subject<string> = new Subject();
    private deleted$: Subject<void> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    webhookDeleted$: Observable<void> = this.deleted$.asObservable();

    constructor(
        private dialog: MatDialog,
        private webhooksService: WebhooksService,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {}

    deleteWebhook(id: string) {
        this.deleteWebhook$.next(id);
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
                switchMap(([webhookID]) =>
                    this.webhooksService.deleteWebhookByID({ webhookID }).pipe(
                        catchError((e) => {
                            this.log.error(
                                e,
                                this.transloco.selectTranslate(
                                    'webhook.errors.deleteError',
                                    null,
                                    'payment-section',
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
