import { FileModification, FileModificationUnit } from '@vality/swag-claim-management';

import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';

// eslint-disable-next-line @typescript-eslint/naming-convention
const FileModificationType = FileModification.FileModificationTypeEnum;
type FileModificationType = FileModification.FileModificationTypeEnum;

export const createFileModificationUnit = (
    fileId: string,
    fileModificationType: FileModificationType = FileModificationType.FileCreated,
): SpecificClaimModificationUnit<FileModificationUnit> => ({
    modificationType: 'ClaimModification',
    claimModificationType: {
        claimModificationType: 'FileModificationUnit',
        fileId,
        fileModification: { fileModificationType },
    },
});
