import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';
import { anyString, anything, mock, objectContaining, verify, when } from 'ts-mockito';

import { OrgsService } from '@dsh/app/api/organizations';
import { MOCK_ORG } from '@dsh/app/api/organizations/tests/mock-org';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { provideMockService } from '@dsh/app/shared/tests';

import { CreateOrganizationDialogComponent } from './create-organization-dialog.component';

describe('CreateOrganizationDialogComponent', () => {
    let component: CreateOrganizationDialogComponent;
    let fixture: ComponentFixture<CreateOrganizationDialogComponent>;
    let mockDialogRef: MatDialogRef<CreateOrganizationDialogComponent>;
    let mockOrganizationsService: OrgsService;
    let mockNotificationsService: NotificationService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockDialogRef = mock<MatDialogRef<CreateOrganizationDialogComponent>>(MatDialogRef);
        mockOrganizationsService = mock(OrgsService);
        mockNotificationsService = mock(NotificationService);
        mockErrorService = mock(ErrorService);

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [CreateOrganizationDialogComponent],
            providers: [
                provideMockService(MatDialogRef, mockDialogRef),
                provideMockService(OrgsService, mockOrganizationsService),
                provideMockService(NotificationService, mockNotificationsService),
                provideMockService(ErrorService, mockErrorService),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateOrganizationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('cancel', () => {
        it('should cancelled', () => {
            component.cancel();
            verify(mockDialogRef.close(BaseDialogResponseStatus.Cancelled)).once();
            expect().nothing();
        });
    });

    describe('create', () => {
        it('should create organization', () => {
            when(mockOrganizationsService.createOrg(anything())).thenReturn(of(MOCK_ORG));
            const input = fixture.debugElement.query(By.css('input'))
                .nativeElement as HTMLInputElement;
            input.value = 'Test 2';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component.create();
            verify(mockOrganizationsService.createOrg(objectContaining({ name: 'Test 2' }))).once();
            verify(mockNotificationsService.success()).once();
            verify(mockDialogRef.close(BaseDialogResponseStatus.Success)).once();
            expect().nothing();
        });

        it("shouldn't create organization", () => {
            const error = new Error('Error 1');
            when(mockOrganizationsService.createOrg(anything())).thenReturn(throwError(error));
            const input = fixture.debugElement.query(By.css('input'))
                .nativeElement as HTMLInputElement;
            input.value = 'Test 2';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component.create();
            verify(mockOrganizationsService.createOrg(objectContaining({ name: 'Test 2' }))).once();
            verify(mockErrorService.error(error)).once();
            verify(mockDialogRef.close(anyString())).never();
            expect().nothing();
        });
    });
});
