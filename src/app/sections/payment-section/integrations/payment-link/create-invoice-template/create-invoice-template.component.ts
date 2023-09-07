import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { createControlProviders, FormGroupSuperclass, NotifyLogService } from '@vality/ng-core';
import { InvoiceLineTaxVAT, InvoiceTemplateAndToken, Shop } from '@vality/swag-payments';
import moment from 'moment';

import { InvoiceTemplateType, InvoiceTemplateLineCostType } from '@dsh/app/api/payments';

import { CreateInvoiceTemplateService, WITHOUT_VAT } from './create-invoice-template.service';

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

    taxModes = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    templateType = InvoiceTemplateType;
    costType = InvoiceTemplateLineCostType;

    invoiceTemplateTypes: InvoiceTemplateType[] = [
        InvoiceTemplateType.InvoiceTemplateSingleLine,
        InvoiceTemplateType.InvoiceTemplateMultiLine,
    ];

    invoiceTemplateCostTypes: InvoiceTemplateLineCostType[] = [
        InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed,
        InvoiceTemplateLineCostType.InvoiceTemplateLineCostRange,
        InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim,
    ];

    control = this.invoiceTemplateFormService.form;
    summary$ = this.invoiceTemplateFormService.summary$;
    isLoading$ = this.invoiceTemplateFormService.isLoading$;

    get cartForm(): UntypedFormArray {
        return this.invoiceTemplateFormService.cartForm;
    }

    constructor(
        private invoiceTemplateFormService: CreateInvoiceTemplateService,
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.invoiceTemplateFormService.errors$
            .pipe(untilDestroyed(this))
            .subscribe((err) =>
                this.log.error(
                    err,
                    this.transloco.selectTranslate('shared.commonError', null, 'components'),
                ),
            );
        this.invoiceTemplateFormService.nextInvoiceTemplateAndToken$
            .pipe(untilDestroyed(this))
            .subscribe((template) => this.next.emit(template));
    }

    nextStep(): void {
        this.invoiceTemplateFormService.create(this.shops);
    }

    clear(): void {
        this.invoiceTemplateFormService.clear();
    }

    addProduct(): void {
        this.invoiceTemplateFormService.addProduct();
    }

    removeProduct(idx: number): void {
        this.invoiceTemplateFormService.removeProduct(idx);
    }
}
