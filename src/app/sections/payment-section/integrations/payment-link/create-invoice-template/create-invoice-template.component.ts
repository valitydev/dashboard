import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { createControlProviders, FormGroupSuperclass, NotifyLogService } from '@vality/ng-core';
import { InvoiceTemplateAndToken, Shop } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import moment from 'moment';

import { CreateInvoiceTemplateService } from './create-invoice-template.service';

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-template',
    templateUrl: 'create-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreateInvoiceTemplateComponent),
})
export class CreateInvoiceTemplateComponent extends FormGroupSuperclass<unknown> implements OnInit {
    @Output()
    next = new EventEmitter<InvoiceTemplateAndToken>();

    @Input()
    shops: Shop[];

    minDate = moment().add('2', 'day').startOf('day').toDate();

    control: UntypedFormGroup = this.fb.group({});

    isLoading$ = this.invoiceTemplateFormService.isLoading$;

    get currency() {
        return this.shops?.find((s) => s.id === this.control.value.shopID)?.currency;
    }

    constructor(
        private invoiceTemplateFormService: CreateInvoiceTemplateService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
        private fb: FormBuilder,
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (isNil(this.shops) || this.shops.length === 0) {
            throw new Error('Shops need to be initialized.');
        }

        this.control = this.invoiceTemplateFormService.createForm(this.shops);

        this.invoiceTemplateFormService.errors$.pipe(untilDestroyed(this)).subscribe((err) => {
            this.control.enable();
            this.log.error(
                err,
                this.transloco.selectTranslate(
                    'createInvoiceTemplate.createInvoiceTemplateFailed',
                    null,
                    'payment-section',
                ),
            );
        });
        this.invoiceTemplateFormService.nextInvoiceTemplateAndToken$
            .pipe(untilDestroyed(this))
            .subscribe((template) => this.next.emit(template));
    }

    nextStep(): void {
        this.control.disable();
        this.invoiceTemplateFormService.create(this.control.value, this.shops);
    }
}
