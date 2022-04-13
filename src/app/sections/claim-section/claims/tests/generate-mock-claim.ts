import { Claim, StatusModificationUnit } from '@vality/swag-claim-management';

export const generateMockClaim = (
    id: number = 1,
    status: StatusModificationUnit.StatusEnum | string = StatusModificationUnit.StatusEnum.Pending,
    revision: number = 1,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
): Claim => ({
    id,
    status,
    changeset: [],
    revision,
    createdAt,
    updatedAt,
});
