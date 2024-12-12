import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from 'ng-flex-layout';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentSumFilterComponent } from './payment-sum-filter.component';
import { PaymentSumFilterForm } from './types/payment-sum-filter-form';

describe('PaymentSumComponent', () => {
    let component: PaymentSumFilterComponent;
    let fixture: ComponentFixture<PaymentSumFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                MatFormFieldModule,
                ReactiveFormsModule,
                FlexLayoutModule,
            ],
            declarations: [PaymentSumFilterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentSumFilterComponent);
        component = fixture.componentInstance;
        component.control = new FormGroup<PaymentSumFilterForm>({
            paymentAmountFrom: new FormControl<number>(),
            paymentAmountTo: new FormControl<number>(),
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
