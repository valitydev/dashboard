import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { WebhookScope } from '@vality/swag-wallets';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { IdentitiesService, WalletDictionaryService } from '@dsh/app/api/wallet';
import { oneMustBeSelected } from '@dsh/components/form-controls';

import { getEventsByTopic } from '../get-events-by-topic';

import TopicEnum = WebhookScope.TopicEnum;

@Component({
    selector: 'dsh-create-webhook-form',
    templateUrl: 'create-webhook-form.component.html',
    standalone: false,
})
export class CreateWebhookFormComponent implements OnInit {
    @Input() form: UntypedFormGroup;

    identities$ = this.identitiesService.identities$;
    activeTopic$ = new BehaviorSubject<TopicEnum>('WithdrawalsTopic');

    eventType$ = combineLatest([
        this.walletDictionaryService.withdrawalsTopicEventType$,
        this.walletDictionaryService.destinationsTopicEventType$,
    ]).pipe(map(([w, d]) => ({ ...w, ...d })));

    constructor(
        private identitiesService: IdentitiesService,
        private fb: UntypedFormBuilder,
        private walletDictionaryService: WalletDictionaryService,
        private dr: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.activeTopic$.pipe(takeUntilDestroyed(this.dr)).subscribe((activeTopic) => {
            if (activeTopic === 'WithdrawalsTopic') {
                this.form.addControl('walletID', this.fb.control(''));
            } else {
                this.form.removeControl('walletID');
            }
            this.form.removeControl('eventTypes');
            this.form.addControl(
                'eventTypes',
                this.fb.array(
                    getEventsByTopic(activeTopic).map((eventName) =>
                        this.fb.group({
                            eventName,
                            selected: false,
                        }),
                    ),
                    [oneMustBeSelected],
                ),
            );
        });
    }

    changeActiveTopic(topic: TopicEnum): void {
        this.activeTopic$.next(topic);
    }

    get eventTypes(): UntypedFormArray {
        return this.form.get('eventTypes') as UntypedFormArray;
    }
}
