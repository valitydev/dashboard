import {
    Invitation,
    InvitationStatusName,
    Invitee,
    InviteeContact,
} from '@vality/swag-organizations';

import { MOCK_MEMBER_ROLE } from './mock-member-role';

export const MOCK_INVITEE_CONTACT: InviteeContact = {
    type: InviteeContact.TypeEnum.EMail,
    email: 'user@vality.dev',
};

export const MOCK_INVITEE: Invitee = {
    contact: MOCK_INVITEE_CONTACT,
    roles: [MOCK_MEMBER_ROLE],
};

export const MOCK_INVITATION: Invitation = {
    id: 'acc87d05-3884-4789-bacc-5da299667409',
    createdAt: '2019-11-21T18:43:00.000000Z',
    expiresAt: '2020-11-21T18:43:00.000000Z',
    invitee: MOCK_INVITEE,
    acceptToken: 'token',
    metadata: { metaMeta: 'postPost' },
    status: InvitationStatusName.Pending,
};
