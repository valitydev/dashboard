import { ReqContractor, ReqLegalEntity } from '@dsh/api-codegen/aggr-proxy';

export function isReqLegalEntity(contractor: ReqContractor): contractor is ReqLegalEntity {
    return contractor.reqContractorType === 'ReqLegalEntity';
}
