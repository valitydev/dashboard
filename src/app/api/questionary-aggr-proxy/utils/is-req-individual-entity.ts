import { ReqContractor, ReqIndividualEntity } from '@vality/swag-questionary-aggr-proxy';

export function isReqIndividualEntity(contractor: ReqContractor): contractor is ReqIndividualEntity {
    return contractor.reqContractorType === 'ReqIndividualEntity';
}
