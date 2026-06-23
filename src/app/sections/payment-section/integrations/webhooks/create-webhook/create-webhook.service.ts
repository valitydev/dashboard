import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';

@Injectable()
export class CreateWebhookService {
    private createWebhook$ = new Subject<void>();
    private created$ = new Subject<void>();
    private destroy$ = new Subject<void>();

    webhookCreated$: Observable<void> = this.created$.asObservable();

    constructor(private dialog: MatDialog) {}

    init() {
        this.createWebhook$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() =>
                    this.dialog
                        .open(CreateWebhookDialogComponent)
                        .afterClosed()
                        .pipe(filter((r) => r === 'created')),
                ),
            )
            .subscribe(() => {
                this.created$.next();
            });
    }

    createWebhook() {
        this.createWebhook$.next();
    }

    destroy() {
        this.destroy$.next();
    }
}
