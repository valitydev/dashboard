import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OrgsService } from '@dsh/app/api/organizations';
import { ErrorService } from '@dsh/app/shared';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { EditRolesDialogComponent } from './edit-roles-dialog.component';

describe('EditRolesDialogComponent', () => {
    let fixture: ComponentFixture<EditRolesDialogComponent>;
    let component: EditRolesDialogComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [EditRolesDialogComponent],
            providers: [
                provideMockService(MatDialogRef),
                provideMockToken(MAT_DIALOG_DATA, {}),
                provideMockService(OrgsService),
                provideMockService(ErrorService),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditRolesDialogComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
