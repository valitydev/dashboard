import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { By } from '@angular/platform-browser';
import { RoleId } from '@vality/swag-organizations';

import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { SelectRoleDialogComponent } from './select-role-dialog.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-select-role-dialog></dsh-select-role-dialog>`,
})
class HostComponent {}

describe('SelectRoleDialogComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: SelectRoleDialogComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [HostComponent, SelectRoleDialogComponent],
            providers: [
                provideMockToken(MAT_DIALOG_DATA, { availableRoles: Object.values(RoleId) }),
                provideMockService(MatDialogRef),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(SelectRoleDialogComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
