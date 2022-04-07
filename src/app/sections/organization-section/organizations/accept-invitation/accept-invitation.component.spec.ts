import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { OrgsService } from '@dsh/api/organizations';
import { ErrorService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { AcceptInvitationComponent } from './accept-invitation.component';

describe('AcceptInvitationComponent', () => {
    let fixture: ComponentFixture<AcceptInvitationComponent>;
    let component: AcceptInvitationComponent;
    let mockRoute: ActivatedRoute;
    let mockOrganizationsService: OrgsService;

    beforeEach(async () => {
        mockRoute = mock(ActivatedRoute);
        when(mockRoute.params).thenReturn(of({ token: '123' } as any));

        mockOrganizationsService = mock(OrgsService);
        when(mockOrganizationsService.joinOrg(anything())).thenReturn(of({} as any));

        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule.withRoutes([])],
            declarations: [AcceptInvitationComponent],
            providers: [
                provideMockService(OrgsService, mockOrganizationsService),
                provideMockService(ErrorService),
                provideMockService(ActivatedRoute, mockRoute),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AcceptInvitationComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('accept method', () => {
        it('should be join to org', () => {
            component.accept();
            verify(mockOrganizationsService.joinOrg(deepEqual({ invitation: '123' }))).once();
            expect().nothing();
        });
    });
});
