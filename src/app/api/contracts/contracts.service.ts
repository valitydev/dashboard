import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contract, ContractsService as ContractsAPIService } from '@dsh/api-codegen/capi/swagger-codegen';
import { IdGeneratorService } from '@dsh/app/shared';

@Injectable()
export class ContractsService {
    constructor(private contractsService: ContractsAPIService, private idGenerator: IdGeneratorService) {}

    getContractByID(contractID: string): Observable<Contract> {
        return this.contractsService.getContractByID(this.idGenerator.shortUuid(), contractID);
    }
}
