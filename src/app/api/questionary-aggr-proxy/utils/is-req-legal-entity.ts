import { ReqContractor, ReqLegalEntity } from '@vality/swag-questionary-aggr-proxy';

export function isReqLegalEntity(contractor: ReqContractor): contractor is ReqLegalEntity {
    return contractor.reqContractorType === 'ReqLegalEntity';
}
