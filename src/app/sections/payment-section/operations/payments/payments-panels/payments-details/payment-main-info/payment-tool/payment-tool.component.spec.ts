import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from 'ng-flex-layout';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { DetailsItemModule } from '@dsh/components/layout';

import { BankCardComponent } from './components/bank-card/bank-card.component';
import { DigitalWalletComponent } from './components/digital-wallet/digital-wallet.component';
import { MobileCommerceComponent } from './components/mobile-commerce/mobile-commerce.component';
import { PaymentTerminalComponent } from './components/payment-terminal/payment-terminal.component';
import { PaymentToolComponent } from './payment-tool.component';

describe('PaymentToolComponent', () => {
    let fixture: ComponentFixture<PaymentToolComponent>;
    let component: PaymentToolComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), FlexModule, MatIconModule, DetailsItemModule],
            declarations: [
                PaymentToolComponent,
                BankCardComponent,
                DigitalWalletComponent,
                PaymentTerminalComponent,
                MobileCommerceComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentToolComponent);
        component = fixture.componentInstance;
        component.paymentToolDetails = {
            detailsType: 'unknown',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
