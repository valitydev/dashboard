import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroupSuperclass, NotifyLogService, createControlProviders } from '@vality/matez';
import { InvoiceTemplateAndToken, Shop } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';
import moment from 'moment';
import { take } from 'rxjs';

import { CreateInvoiceTemplateService } from './create-invoice-template.service';

@Component({
    selector: 'dsh-create-invoice-template',
    templateUrl: 'create-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CreateInvoiceTemplateComponent),
    standalone: false,
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
        private dr: DestroyRef,
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (isNil(this.shops) || this.shops.length === 0) {
            throw new Error('Shops need to be initialized.');
        }

        this.control = this.invoiceTemplateFormService.createForm(this.shops);

        this.invoiceTemplateFormService.errors$
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((err) => {
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
            .pipe(take(1), takeUntilDestroyed(this.dr))
            .subscribe((template) => this.next.emit(template));
    }

    nextStep(): void {
        this.control.disable();
        this.invoiceTemplateFormService.create(this.control.value, this.shops);
    }
}
