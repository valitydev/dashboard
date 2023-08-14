import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { WebhooksService } from '@dsh/app/api/payments';
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form = this.initForm();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.loading$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorOccurred$ = this.error$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    webhookCreated$ = this.created$.asObservable();

    constructor(
        private fb: UntypedFormBuilder,
        private webhooksService: WebhooksService,
    ) {
        this.create$
            .pipe(
                map(formValuesToWebhook),
                switchMap((webhookParams) =>
                    this.webhooksService.createWebhook({ webhookParams }).pipe(
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
            shopID: ['', Validators.required],
            url: ['', Validators.required],
            eventType: ['InvoicesTopic', Validators.required],
            eventTypes: this.fb.array(
                getEventsByTopic('InvoicesTopic').map((eventName) =>
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
