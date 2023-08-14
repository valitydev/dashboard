import { Injectable } from '@angular/core';
import { clean } from '@vality/ng-core';
import { Claim, Modification } from '@vality/swag-claim-management';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

import {
    ClaimsService,
    createContractCreationModification,
    createInternationalLegalEntityModification,
    createShopCreationModification,
    makeShopLocation,
    createInternationalContractPayoutToolModification,
} from '@dsh/app/api/claim-management';
import { IdGeneratorService } from '@dsh/app/shared/services/id-generator';

import { InternationalShopEntityFormValue } from '../../types/international-shop-entity-form-value';

import {
    payoutToolDetailsInternationalBankAccountToInternationalBankAccount,
    payoutToolFormToInternationalBankAccount,
} from './utils';

@Injectable()
export class CreateInternationalShopEntityService {
    constructor(
        private claimsService: ClaimsService,
        private idGenerator: IdGeneratorService,
    ) {}

    createShop(creationData: InternationalShopEntityFormValue): Observable<Claim> {
        return this.claimsService
            .createClaim({ changeset: this.createClaimsModifications(creationData) })
            .pipe(
                switchMap((claim) =>
                    this.claimsService
                        .requestReviewClaimByIDWithRevisionCheck({
                            claimID: claim.id,
                            claimRevision: claim.revision,
                        })
                        .pipe(mapTo(claim)),
                ),
            );
    }

    private createClaimsModifications({
        shopDetails,
        orgDetails: { created: newContractor, existing: contract },
        paymentInstitution,
        bankAccount: { created: newBankAccount, existing: payoutTool },
    }: InternationalShopEntityFormValue): Modification[] {
        const contractorID = this.idGenerator.uuid();
        const contractID = this.idGenerator.uuid();
        const payoutToolID = this.idGenerator.uuid();
        const shopID = this.idGenerator.uuid();
        const contractor = contract?.contractor;

        return clean([
            createInternationalLegalEntityModification(
                contractorID,
                newContractor
                    ? {
                          legalName: newContractor.organizationName,
                          registeredNumber: '',
                          registeredAddress: newContractor.registeredAddress,
                          tradingName: newContractor.tradingName,
                          actualAddress: newContractor.actualAddress,
                          country: newContractor.country,
                      }
                    : {
                          legalName: contractor.legalName,
                          registeredNumber: contractor.registeredNumber,
                          registeredAddress: contractor.registeredOffice,
                          tradingName: contractor.tradingName,
                          actualAddress: contractor.principalPlaceOfBusiness,
                          country: contractor.country,
                      },
            ),
            createContractCreationModification(contractID, {
                contractorID,
                paymentInstitution: { id: paymentInstitution?.id ?? 1 },
            }),
            createInternationalContractPayoutToolModification(
                contractID,
                payoutToolID,
                newBankAccount ? newBankAccount.currency : payoutTool.currency,
                newBankAccount
                    ? {
                          ...payoutToolFormToInternationalBankAccount(newBankAccount.payoutTool),
                          correspondentAccount: newBankAccount.correspondentPayoutTool
                              ? payoutToolFormToInternationalBankAccount(
                                    newBankAccount.correspondentPayoutTool,
                                )
                              : null,
                      }
                    : {
                          ...payoutToolDetailsInternationalBankAccountToInternationalBankAccount(
                              payoutTool.details,
                          ),
                          correspondentAccount: payoutTool.details.correspondentBankAccount
                              ? payoutToolDetailsInternationalBankAccountToInternationalBankAccount(
                                    payoutTool.details.correspondentBankAccount,
                                )
                              : null,
                      },
            ),
            createShopCreationModification(shopID, {
                category: {
                    categoryID: shopDetails.category?.categoryID ?? 1,
                },
                location: makeShopLocation({
                    url: shopDetails.url,
                }),
                details: {
                    name: shopDetails.name,
                },
                payoutToolID,
                contractID,
            }),
        ]);
    }
}
