import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from 'ng-flex-layout';

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
