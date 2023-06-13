import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { InvitationListResult } from '@vality/swag-organizations';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anything, mock, verify, when, anyString } from 'ts-mockito';

import { OrgsService } from '@dsh/app/api/organizations';
import { MOCK_INVITATION } from '@dsh/app/api/organizations/tests/mock-invitation';
import { MOCK_ORG } from '@dsh/app/api/organizations/tests/mock-org';
import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { InvitationsComponent } from './invitations.component';

describe('InvitationsComponent', () => {
    let component: InvitationsComponent;
    let fixture: ComponentFixture<InvitationsComponent>;
    let mockRoute: ActivatedRoute;
    let mockOrganizationsService: OrgsService;
    let mockDialog: MatDialog;

    const mockInvitationsResult: InvitationListResult = {
        result: new Array(5).fill(MOCK_INVITATION),
    };

    beforeEach(async () => {
        mockRoute = mock(ActivatedRoute);
        mockOrganizationsService = mock(OrgsService);
        mockDialog = mock(MatDialog);

        await TestBed.configureTestingModule({
            declarations: [InvitationsComponent],
            providers: [
                provideMockToken(DIALOG_CONFIG, { small: {}, medium: {}, large: {} }),
                provideMockService(OrgsService, mockOrganizationsService),
                provideMockService(ErrorService),
                provideMockService(ActivatedRoute, mockRoute),
                provideMockService(MatDialog, mockDialog),
            ],
        }).compileComponents();

        when(mockRoute.params).thenReturn(of({ orgId: MOCK_ORG.id }));
        when(mockOrganizationsService.getOrg(MOCK_ORG.id)).thenReturn(of(MOCK_ORG));
        when(mockOrganizationsService.listInvitations(MOCK_ORG.id, anyString())).thenReturn(of(mockInvitationsResult));

        fixture = TestBed.createComponent(InvitationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('init', () => {
        it('should load organization$', () => {
            const expected$ = cold('(a|)', { a: MOCK_ORG });
            component.organization$.subscribe();
            verify(mockOrganizationsService.getOrg(MOCK_ORG.id)).once();
            expect(component.organization$).toBeObservable(expected$);
        });

        it('should load invitations$', () => {
            const expected$ = cold('(a)', { a: mockInvitationsResult.result });
            expect(component.invitations$).toBeObservable(expected$);
        });
    });

    describe('refresh', () => {
        it('should load invitations$', () => {
            component.invitations$.subscribe();
            component.refresh();
            verify(mockOrganizationsService.listInvitations(MOCK_ORG.id, anyString())).twice();
            const expected$ = cold('(a)', { a: mockInvitationsResult.result });
            expect(component.invitations$).toBeObservable(expected$);
        });
    });

    describe('createInvitation', () => {
        it('should be created', () => {
            when(mockDialog.open(anything(), anything())).thenReturn({
                afterClosed: () => of(BaseDialogResponseStatus.Success),
            } as any);
            component.invitations$.subscribe();
            component.createInvitation();
            verify(mockOrganizationsService.listInvitations(MOCK_ORG.id, anyString())).twice();
            expect().nothing();
        });
    });
});
