import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { WebhooksService } from '@dsh/app/api/wallet';
import { oneMustBeSelected } from '@dsh/components/form-controls';

import { FormParams } from './form-params';
import { formValuesToWebhook } from './form-values-to-webhook';
import { getEventsByTopic } from './get-events-by-topic';

@Injectable()
export class CreateWebhookDialogService {
    private create$: Subject<FormParams> = new Subject();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<void>();
    private created$ = new Subject();

    form = this.initForm();

    isLoading$ = this.loading$.asObservable();

    errorOccurred$ = this.error$.asObservable();

    webhookCreated$ = this.created$.asObservable();

    constructor(
        private fb: UntypedFormBuilder,
        private walletWebhooksService: WebhooksService,
    ) {
        this.create$
            .pipe(
                map(formValuesToWebhook),
                switchMap((webhookParams) =>
                    this.walletWebhooksService.createWebhook({ webhookParams }).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        }),
                    ),
                ),
                filter((result) => result !== 'error'),
            )
            .subscribe(() => this.created$.next('created'));
    }

    save() {
        this.create$.next(this.form.value);
    }

    private initForm(): UntypedFormGroup {
        return this.fb.group({
            identityID: ['', Validators.required],
            url: ['', Validators.required],
            eventType: ['WithdrawalsTopic', Validators.required],
            walletID: null,
            eventTypes: this.fb.array(
                getEventsByTopic('WithdrawalsTopic').map((eventName) =>
                    this.fb.group({
                        eventName,
                        selected: false,
                    }),
                ),
                [oneMustBeSelected],
            ),
        });
    }
}
