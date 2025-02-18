import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { filter } from 'rxjs/operators';

import { CreateWebhookDialogService } from './create-webhook-dialog.service';

@Component({
    templateUrl: 'create-webhook-dialog.component.html',
    styleUrls: ['create-webhook-dialog.component.scss'],
    providers: [CreateWebhookDialogService],
    standalone: false,
})
export class CreateWebhookDialogComponent implements OnInit {
    form = this.createWebhookDialogService.form;
    isLoading$ = this.createWebhookDialogService.isLoading$;

    constructor(
        private dialogRef: MatDialogRef<CreateWebhookDialogComponent>,
        private createWebhookDialogService: CreateWebhookDialogService,
        private transloco: TranslocoService,
        private log: NotifyLogService,
    ) {
        this.createWebhookDialogService.webhookCreated$.pipe(filter((r) => !!r)).subscribe((r) => {
            this.dialogRef.close(r);
        });
    }

    ngOnInit() {
        this.createWebhookDialogService.webhookCreated$.subscribe(() =>
            this.dialogRef.close('created'),
        );
        this.createWebhookDialogService.errorOccurred$.subscribe((err) =>
            this.log.error(
                err,
                this.transloco.selectTranslate(
                    'webhook.errors.createError',
                    null,
                    'payment-section',
                ),
            ),
        );
    }

    save() {
        this.createWebhookDialogService.save();
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
