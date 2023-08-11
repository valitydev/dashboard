import { ApiKeyStatus } from '@vality/swag-api-keys-v2';

import { StatusColor } from '@dsh/app/theme-manager';

export const API_KEY_STATUS_COLOR = {
    [ApiKeyStatus.Active]: StatusColor.Success,
    [ApiKeyStatus.Revoked]: StatusColor.Warn,
};
