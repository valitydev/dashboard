import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { OrgsService } from '@dsh/app/api/organizations';
import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { OrganizationManagementService } from '@dsh/app/shared/services/organization-management/organization-management.service';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { MemberComponent } from './member.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-member></dsh-member>`,
})
class HostComponent {}

describe('MemberComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: MemberComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [HostComponent, MemberComponent],
            providers: [
                provideMockToken(DIALOG_CONFIG, {} as unknown),
                provideMockService(OrganizationManagementService),
                provideMockService(OrgsService),
                provideMockService(NotificationService),
                provideMockService(ErrorService),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(MemberComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
