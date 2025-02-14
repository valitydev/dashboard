import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';

import { PaymentDetailHeaderComponent } from './payment-detail-header.component';

describe('PaymentDetailHeaderComponent', () => {
    let component: PaymentDetailHeaderComponent;
    let fixture: ComponentFixture<PaymentDetailHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs(
                    {
                        ru: {
                            operations: {
                                payments: {
                                    details: {
                                        name: 'Платеж',
                                    },
                                },
                            },
                        },
                    },
                    {
                        availableLangs: ['ru'],
                        defaultLang: 'ru',
                    },
                ),
            ],
            declarations: [PaymentDetailHeaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentDetailHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
