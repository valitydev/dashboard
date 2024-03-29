import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anyString, anything, mock, verify, when } from 'ts-mockito';

import { OrgsService } from '@dsh/app/api/organizations';
import { MOCK_MEMBER } from '@dsh/app/api/organizations/tests/mock-member';
import { MOCK_ORG } from '@dsh/app/api/organizations/tests/mock-org';
import { ErrorService, KeycloakTokenInfoService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { OrganizationManagementService } from './organization-management.service';

describe('OrganizationManagementService', () => {
    let mockOrganizationsService: OrgsService;
    let mockKeycloakTokenInfoService: KeycloakTokenInfoService;

    let service: OrganizationManagementService;

    const someUserId = 'some_user_id';

    beforeEach(() => {
        mockOrganizationsService = mock(OrgsService);
        mockKeycloakTokenInfoService = mock(KeycloakTokenInfoService);

        when(mockKeycloakTokenInfoService.partyID$).thenReturn(of(someUserId));
        when(mockOrganizationsService.getOrgMember(anyString(), anyString())).thenReturn(
            of(MOCK_MEMBER),
        );
        when(mockOrganizationsService.createOrg(anything())).thenReturn(of(MOCK_ORG));

        TestBed.configureTestingModule({
            providers: [
                OrganizationManagementService,
                provideMockService(OrgsService, mockOrganizationsService),
                provideMockService(KeycloakTokenInfoService, mockKeycloakTokenInfoService),
                provideMockService(ErrorService),
            ],
        });

        service = TestBed.inject(OrganizationManagementService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getCurrentMember', () => {
        it('should be return member', () => {
            service.init(MOCK_ORG);
            expect(service.currentMember$).toBeObservable(cold('(a)', { a: MOCK_MEMBER }));
            verify(mockOrganizationsService.getOrgMember(MOCK_ORG.id, someUserId)).once();
        });
    });

    describe('isOrganizationOwner', () => {
        it('should be return false', () => {
            service.init(MOCK_ORG);
            const member$ = service.isOrganizationOwner$;
            expect(member$).toBeObservable(cold('(a)', { a: false }));
        });

        it('should be return true', () => {
            service.init(MOCK_ORG);
            when(mockKeycloakTokenInfoService.partyID$).thenReturn(of(MOCK_ORG.owner));
            const member$ = service.isOrganizationOwner$;
            expect(member$).toBeObservable(cold('(a)', { a: true }));
        });
    });
});
