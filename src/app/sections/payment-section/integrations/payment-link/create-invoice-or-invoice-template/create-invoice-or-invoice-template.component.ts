import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ChangeDetectionStrategy,
    Input,
    DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, UntypedFormBuilder } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { NotifyLogService } from '@vality/matez';
import { Invoice, InvoiceTemplateAndToken, Shop } from '@vality/swag-payments';
import { merge, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { InvoicesService } from '@dsh/app/api/payments';

export enum Type {
    Invoice = 'invoice',
    Template = 'template',
}

export type InvoiceOrInvoiceTemplate =
    | { invoiceOrInvoiceTemplate: Invoice; type: Type.Invoice }
    | { invoiceOrInvoiceTemplate: InvoiceTemplateAndToken; type: Type.Template };

@Component({
    selector: 'dsh-create-invoice-or-invoice-template',
    templateUrl: 'create-invoice-or-invoice-template.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class CreateInvoiceOrInvoiceTemplateComponent implements OnInit {
    @Input() shops: Shop[];
    @Output() next = new EventEmitter<InvoiceOrInvoiceTemplate>();

    nextInvoice = new Subject<Invoice>();
    nextTemplate = new Subject<InvoiceTemplateAndToken>();

    form = this.fb.group({ type: null });
    type = Type;

    createInvoiceFormControl = new FormControl();

    constructor(
        private invoicesService: InvoicesService,
        private transloco: TranslocoService,
        private fb: UntypedFormBuilder,
        private log: NotifyLogService,
        private dr: DestroyRef,
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
                .pipe(takeUntilDestroyed(this.dr)),
        ).subscribe((invoiceOrInvoiceTemplate) => this.next.emit(invoiceOrInvoiceTemplate));
    }

    create(): void {
        this.createInvoiceFormControl.disable();
        this.invoicesService
            .createInvoice({
                invoiceParams: this.createInvoiceFormControl.value,
            })
            .pipe(
                takeUntilDestroyed(this.dr),
                catchError((err) => {
                    this.log.error(
                        err,
                        this.transloco.selectTranslate(
                            'createInvoiceOrInvoiceTemplate.createInvoiceFailed',
                            null,
                            'payment-section',
                        ),
                    );
                    this.createInvoiceFormControl.enable();
                    return throwError(() => err);
                }),
            )
            .subscribe(({ invoice }) => {
                this.nextInvoice.next(invoice);
                this.createInvoiceFormControl.reset();
                this.createInvoiceFormControl.enable();
            });
    }
}
