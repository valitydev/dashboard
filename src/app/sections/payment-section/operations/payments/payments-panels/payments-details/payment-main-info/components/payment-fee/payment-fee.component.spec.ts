import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getTextContent } from '@dsh/app/shared/tests/get-text-content';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { generateMockPayment } from '../../../../../tests/generate-mock-payment';
import { MockDetailsItemModule } from '../../../../../tests/mock-details-item-component';

import { PaymentFeeComponent } from './payment-fee.component';

describe('PaymentFeeComponent', () => {
    let component: PaymentFeeComponent;
    let fixture: ComponentFixture<PaymentFeeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MockDetailsItemModule],
            declarations: [PaymentFeeComponent],
        })
            .overrideComponent(PaymentFeeComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentFeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should show payment fee amount using payment fee and amount', () => {
            component.payment = generateMockPayment({
                amount: 1000,
                fee: 200,
                currency: 'USD',
            });

            fixture.detectChanges();

            expect(getTextContent(fixture.debugElement.nativeElement)).toBe('$2.00 (20%)');
        });
    });
});
