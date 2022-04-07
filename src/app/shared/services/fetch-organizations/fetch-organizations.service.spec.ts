import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mock, verify, when } from 'ts-mockito';

import { OrganizationSearchResult } from '@dsh/api-codegen/organizations';
import { OrganizationsService } from '@dsh/api/organizations';
import { MOCK_ORG } from '@dsh/api/organizations/tests/mock-org';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { DEBOUNCE_FETCHER_ACTION_TIME } from '@dsh/app/shared';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { FetchOrganizationsService } from './fetch-organizations.service';

describe('FetchOrganizationsService', () => {
    let mockOrganizationsService: OrganizationsService;
    let service: FetchOrganizationsService;

    const mockOrgs: OrganizationSearchResult = {
        result: new Array(5).fill(MOCK_ORG),
    };

    beforeEach(() => {
        mockOrganizationsService = mock(OrganizationsService);

        TestBed.configureTestingModule({
            providers: [
                FetchOrganizationsService,
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockToken(SEARCH_LIMIT, 5),
                provideMockToken(DEBOUNCE_FETCHER_ACTION_TIME, 0),
            ],
        });

        service = TestBed.inject(FetchOrganizationsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('search', () => {
        it('should be fetched', (done) => {
            const orgs = new Array(5).fill(MOCK_ORG);
            when(mockOrganizationsService.listOrgMembership(5, undefined)).thenReturn(of(mockOrgs));
            const sub = service.searchResult$.subscribe((v) => {
                verify(mockOrganizationsService.listOrgMembership(5, undefined)).called();
                expect(v).toEqual(orgs);
                sub.unsubscribe();
                done();
            });
            service.search();
        });
    });
});
