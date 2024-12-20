import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { Shop } from '@vality/swag-payments';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentInstitutionRealm } from '@dsh/app/api/model';
import { ApiShopsService } from '@dsh/app/api/shop';

import { generateMockInvoice } from '../tests/generate-mock-invoice';

import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';
import { CreateInvoiceService } from './create-invoice.service';

describe('CreateInvoiceService', () => {
    let service: CreateInvoiceService;
    let mockApiShopsService: ApiShopsService;
    let mockMatDialog: MatDialog;
    let mockSnackbar: MatSnackBar;
    let mockDialogRef: MatDialogRef<CreateInvoiceDialogComponent>;

    beforeEach(() => {
        mockApiShopsService = mock(ApiShopsService);
        mockMatDialog = mock(MatDialog);
        mockSnackbar = mock(MatSnackBar);
        mockDialogRef = mock<MatDialogRef<CreateInvoiceDialogComponent>>(MatDialogRef);
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        operations: {
                            invoices: {
                                actions: {
                                    invoiceCreated: 'invoice created',
                                },
                            },
                        },
                    },
                    {
                        availableLangs: ['operations'],
                        defaultLang: 'operations',
                    },
                ),
            ],
            providers: [
                CreateInvoiceService,
                {
                    provide: ApiShopsService,
                    useFactory: () => instance(mockApiShopsService),
                },
                {
                    provide: MatDialog,
                    useFactory: () => instance(mockMatDialog),
                },
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockSnackbar),
                },
            ],
        });
        service = TestBed.inject(CreateInvoiceService);
        await TestBed.inject(TranslocoService).load('operations').toPromise();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createInvoice', () => {
        beforeEach(() => {
            when(mockApiShopsService.shops$).thenReturn(of([]));
            when(
                mockMatDialog.open<CreateInvoiceDialogComponent, Shop[]>(
                    CreateInvoiceDialogComponent,
                    deepEqual({
                        width: '720px',
                        data: [],
                    }),
                ),
            ).thenReturn(instance(mockDialogRef));
            when(
                mockSnackbar.open('invoice created', 'OK', deepEqual({ duration: 2000 })),
            ).thenReturn(null);
        });

        afterEach(() => {
            // ts mockito not work properly with jasmine expectations so we need to make expect like that
            expect().nothing();
        });

        it('should open dialog', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('cancel'));

            service.createInvoice(PaymentInstitutionRealm.Test);

            verify(
                mockMatDialog.open<CreateInvoiceDialogComponent, Shop[]>(
                    CreateInvoiceDialogComponent,
                    deepEqual({
                        width: '720px',
                        data: [],
                    }),
                ),
            ).once();
        });

        it('should not return invoice id if dialog was cancelled', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of('cancel'));

            expect(service.createInvoice(PaymentInstitutionRealm.Test)).toBeObservable(cold(''));
        });

        it('should return created invoice id', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of(generateMockInvoice('test')));

            expect(service.createInvoice(PaymentInstitutionRealm.Test)).toBeObservable(
                cold('a', {
                    a: 'test',
                }),
            );
        });

        it('should show snack bar after invoice creation', () => {
            when(mockDialogRef.afterClosed()).thenReturn(of(generateMockInvoice('test')));

            service.createInvoice(PaymentInstitutionRealm.Test);

            verify(
                mockSnackbar.open('invoice created', 'OK', deepEqual({ duration: 2000 })),
            ).once();
        });
    });
});
