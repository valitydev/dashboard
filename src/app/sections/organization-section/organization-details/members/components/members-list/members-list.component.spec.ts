import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideMockService } from '@dsh/app/shared/tests';

import { MembersExpandedIdManager } from '../../services/members-expanded-id-manager/members-expanded-id-manager.service';

import { MembersListComponent } from './members-list.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-members-list></dsh-members-list>`,
})
class HostComponent {}

describe('MembersListComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: MembersListComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HostComponent, MembersListComponent],
            providers: [provideMockService(MembersExpandedIdManager)],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(MembersListComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
