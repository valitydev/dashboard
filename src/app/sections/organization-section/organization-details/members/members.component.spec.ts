import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MemberOrgListResult } from '@vality/swag-organizations';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { mock, verify, when } from 'ts-mockito';

import { OrgsService } from '@dsh/app/api/organizations';
import { MOCK_MEMBER } from '@dsh/app/api/organizations/tests/mock-member';
import { MOCK_ORG } from '@dsh/app/api/organizations/tests/mock-org';
import { ErrorService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { MembersComponent } from './members.component';

@Component({
    selector: 'dsh-host',
    template: `<dsh-members></dsh-members>`,
})
class HostComponent {}

describe('MembersComponent', () => {
    let fixture: ComponentFixture<HostComponent>;
    let debugElement: DebugElement;
    let component: MembersComponent;
    let mockOrganizationsService: OrgsService;
    let mockRoute: ActivatedRoute;

    const mockMembers: MemberOrgListResult = {
        result: new Array(11).fill(MOCK_MEMBER),
    };

    beforeEach(async () => {
        mockOrganizationsService = mock(OrgsService);
        mockRoute = mock(ActivatedRoute);

        await TestBed.configureTestingModule({
            declarations: [HostComponent, MembersComponent],
            providers: [
                provideMockService(OrgsService, mockOrganizationsService),
                provideMockService(ActivatedRoute, mockRoute),
                provideMockService(ErrorService),
            ],
        }).compileComponents();

        when(mockRoute.params).thenReturn(of({ orgId: MOCK_ORG.id }));
        when(mockOrganizationsService.getOrg(MOCK_ORG.id)).thenReturn(of(MOCK_ORG));
        when(mockOrganizationsService.listOrgMembers(MOCK_ORG.id)).thenReturn(of(mockMembers));

        fixture = TestBed.createComponent(HostComponent);
        debugElement = fixture.debugElement.query(By.directive(MembersComponent));
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('init', () => {
        it('should load organization$', () => {
            const expected$ = cold('(a|)', { a: MOCK_ORG });
            component.organization$.subscribe();
            verify(mockOrganizationsService.getOrg(MOCK_ORG.id)).once();
            expect(component.organization$).toBeObservable(expected$);
        });

        it('should load members$', () => {
            const expected$ = cold('(a)', { a: mockMembers.result });
            expect(component.members$).toBeObservable(expected$);
        });
    });

    describe('refresh', () => {
        it('should load members$', () => {
            component.members$.subscribe();
            component.refresh();
            verify(mockOrganizationsService.listOrgMembers(MOCK_ORG.id)).twice();
            const expected$ = cold('(a)', { a: mockMembers.result });
            expect(component.members$).toBeObservable(expected$);
        });
    });
});
