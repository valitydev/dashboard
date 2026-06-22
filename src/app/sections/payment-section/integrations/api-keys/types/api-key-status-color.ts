import { StatusColor } from '@dsh/app/theme-manager';

import { ApiKeyStatus } from '@vality/swag-api-keys-v2';


export const API_KEY_STATUS_COLOR = {
    [ApiKeyStatus.Active]: StatusColor.Success,
    [ApiKeyStatus.Revoked]: StatusColor.Warn,
};
