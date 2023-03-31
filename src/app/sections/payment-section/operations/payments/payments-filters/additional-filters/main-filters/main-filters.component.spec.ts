import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { MainFiltersComponent } from './main-filters.component';
import { MainFiltersForm } from './types/main-filters-form';

describe('MainFiltersComponent', () => {
    let component: MainFiltersComponent;
    let fixture: ComponentFixture<MainFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                FlexLayoutModule,
            ],
            declarations: [MainFiltersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainFiltersComponent);
        component = fixture.componentInstance;
        component.control = new FormGroup<MainFiltersForm>({
            payerEmail: new FormControl<string>(''),
            customerID: new FormControl<string>(''),
            rrn: new FormControl<string>(''),
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
