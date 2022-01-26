import { ReqContractor, ReqIndividualEntity } from '@dsh/api-codegen/aggr-proxy';

export function isReqIndividualEntity(contractor: ReqContractor): contractor is ReqIndividualEntity {
    return contractor.reqContractorType === 'ReqIndividualEntity';
}
