import { MemberRole } from '@vality/swag-organizations';

export type MemberRoleOptionalId = Omit<MemberRole, 'id'> & Partial<Pick<MemberRole, 'id'>>;
