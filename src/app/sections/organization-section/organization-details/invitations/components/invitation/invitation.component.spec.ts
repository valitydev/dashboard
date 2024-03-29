import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { OrgsService } from '@dsh/app/api/organizations';
import { ErrorService, NotificationService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { InvitationComponent } from './invitation.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-invitation></dsh-invitation>`,
})
class HostComponent {}

describe('InvitationComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: InvitationComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, InvitationComponent],
            providers: [
                provideMockService(MatDialog),
                provideMockService(OrgsService),
                provideMockService(NotificationService),
                provideMockService(ErrorService),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(InvitationComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
