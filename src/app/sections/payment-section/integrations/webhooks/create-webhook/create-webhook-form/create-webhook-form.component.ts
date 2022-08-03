import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { WebhookScope } from '@vality/swag-payments';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopsService, PaymentsDictionaryService } from '@dsh/api/payments';
import { oneMustBeSelected } from '@dsh/components/form-controls';

import { getEventsByTopic } from '../get-events-by-topic';

import TopicEnum = WebhookScope.TopicEnum;

@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
})
export class CreateWebhookFormComponent implements OnInit {
    @Input()
    form: UntypedFormGroup;

    shops$ = this.shopService.shops$;

    activeTopic$ = new BehaviorSubject<TopicEnum>('InvoicesTopic');

    eventType$ = combineLatest([
        this.paymentsDictionaryService.invoicesTopicEventType$,
        this.paymentsDictionaryService.customersTopicEventType$,
    ]).pipe(map(([i, c]) => ({ ...i, ...c })));

    constructor(
        private shopService: ShopsService,
        private fb: UntypedFormBuilder,
        private paymentsDictionaryService: PaymentsDictionaryService
    ) {}

    ngOnInit() {
        this.activeTopic$.subscribe((activeTopic) => {
            this.form.removeControl('eventTypes');
            this.form.addControl(
                'eventTypes',
                this.fb.array(
                    getEventsByTopic(activeTopic).map((eventName) =>
                        this.fb.group({
                            eventName,
                            selected: false,
                        })
                    ),
                    [oneMustBeSelected]
                )
            );
        });
    }

    changeActiveTopic(topic: TopicEnum) {
        this.activeTopic$.next(topic);
    }

    get eventTypes() {
        return this.form.get('eventTypes') as UntypedFormArray;
    }
}
