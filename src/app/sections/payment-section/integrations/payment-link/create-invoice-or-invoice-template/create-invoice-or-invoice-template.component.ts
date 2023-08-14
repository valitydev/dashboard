import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Invoice, InvoiceTemplateAndToken } from '@vality/swag-payments';
import pick from 'lodash-es/pick';
import moment from 'moment';
import { merge, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { InvoicesService } from '@dsh/app/api/payments';

import { CreateInvoiceOrInvoiceTemplateService } from './create-invoice-or-invoice-template.service';

export enum Type {
    Invoice = 'invoice',
    Template = 'template',
}

export type InvoiceOrInvoiceTemplate =
    | { invoiceOrInvoiceTemplate: Invoice; type: Type.Invoice }
    | { invoiceOrInvoiceTemplate: InvoiceTemplateAndToken; type: Type.Template };

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-or-invoice-template',
    templateUrl: 'create-invoice-or-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceOrInvoiceTemplateComponent implements OnInit {
    @Output() next = new EventEmitter<InvoiceOrInvoiceTemplate>();

    nextInvoice = new Subject<Invoice>();
    nextTemplate = new Subject<InvoiceTemplateAndToken>();

    shops$ = this.createInvoiceOrInvoiceTemplateService.shops$;
    form = this.createInvoiceOrInvoiceTemplateService.form;
    type = Type;

    createInvoiceFormControl = this.createInvoiceOrInvoiceTemplateService.createInvoiceFormControl;

    constructor(
        private createInvoiceOrInvoiceTemplateService: CreateInvoiceOrInvoiceTemplateService,
        private invoicesService: InvoicesService,
    ) {}

    ngOnInit(): void {
        merge(
            this.nextTemplate.pipe(
                map(
                    (template) =>
                        ({ invoiceOrInvoiceTemplate: template, type: Type.Template }) as const,
                ),
            ),
            this.nextInvoice
                .pipe(
                    map(
                        (invoice) =>
                            ({ invoiceOrInvoiceTemplate: invoice, type: Type.Invoice }) as const,
                    ),
                )
                .pipe(untilDestroyed(this)),
        ).subscribe((invoiceOrInvoiceTemplate) => this.next.emit(invoiceOrInvoiceTemplate));
    }

    create(): void {
        const { value } = this.createInvoiceFormControl;
        this.shops$
            .pipe(
                take(1),
                switchMap((shops) =>
                    this.invoicesService.createInvoice({
                        invoiceParams: {
                            ...pick(value, ['product', 'description', 'cart', 'shopID']),
                            dueDate: moment(value.dueDate).utc().endOf('d').format(),
                            currency: shops.find((s) => s.id === value.shopID)?.currency,
                            metadata: {},
                        },
                    }),
                ),
                untilDestroyed(this),
            )
            .subscribe(({ invoice }) => this.nextInvoice.next(invoice));
    }
}
