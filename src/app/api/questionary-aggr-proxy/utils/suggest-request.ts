import {
    AddressQuery,
    BankQuery,
    DaDataRequest,
    FioQuery,
    FmsUnitQuery,
    OkvedQuery,
    PartyQuery,
} from '@vality/swag-questionary-aggr-proxy';

import { Mapping } from '@dsh/type-utils';

type RequestType = DaDataRequest.DaDataRequestTypeEnum;

type FullParamsByRequestType = Mapping<
    RequestType,
    DaDataRequest,
    {
        /* eslint-disable @typescript-eslint/naming-convention */
        AddressQuery: AddressQuery;
        BankQuery: BankQuery;
        FioQuery: FioQuery;
        FmsUnitQuery: FmsUnitQuery;
        OkvedQuery: OkvedQuery;
        PartyQuery: PartyQuery;
        /* eslint-enable @typescript-eslint/naming-convention */
    }
>;

export type ParamsByRequestType = {
    [name in RequestType]: Omit<FullParamsByRequestType[name], 'daDataRequestType'>;
};
