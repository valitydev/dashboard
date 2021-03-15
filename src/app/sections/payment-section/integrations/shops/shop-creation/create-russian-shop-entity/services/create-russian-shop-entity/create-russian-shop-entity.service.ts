import { Injectable } from '@angular/core';
import isNil from 'lodash.isnil';
import { forkJoin, Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Claim, PartyModification } from '@dsh/api-codegen/claim-management';
import { ClaimsService } from '@dsh/api/claims';
import {
    createContractCreationModification,
    createRussianBankAccountModification,
    createRussianContractPayoutToolModification,
    createRussianLegalEntityModification,
    createShopCreationModification,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';
import { IdGeneratorService } from '@dsh/app/shared/services/id-generator/id-generator.service';

import { RussianShopCreateData } from '../../types/russian-shop-create-data';

@Injectable()
export class CreateRussianShopEntityService {
    constructor(private claimsService: ClaimsService, private idGenerator: IdGeneratorService) {}

    createShop(creationData: RussianShopCreateData): Observable<Claim> {
        return this.claimsService.createClaim(this.createShopCreationModifications(creationData)).pipe(
            switchMap((claim: Claim) => {
                return forkJoin([of(claim), this.claimsService.requestReviewClaimByID(claim.id, claim.revision)]);
            }),
            pluck(0)
        );
    }

    private createShopCreationModifications({
        url,
        name,
        contract,
        payoutToolID: shopPayoutToolID,
        bankAccount: { account, bankName, bankPostAccount, bankBik },
    }: RussianShopCreateData): PartyModification[] {
        const contractorID = this.idGenerator.generateUUID();
        const contractID = this.idGenerator.generateUUID();
        const shopID = this.idGenerator.generateUUID();

        let payoutToolID = this.idGenerator.generateUUID();
        const payoutChangeset: PartyModification[] = [];

        if (isNil(shopPayoutToolID)) {
            payoutChangeset.push(
                createRussianContractPayoutToolModification(contractID, payoutToolID, {
                    account,
                    bankName,
                    bankPostAccount,
                    bankBik,
                })
            );
        } else {
            payoutToolID = shopPayoutToolID;
        }

        const {
            actualAddress,
            bankAccount: russianBankAccount,
            inn,
            postAddress,
            registeredName,
            registeredNumber,
            representativeDocument,
            representativeFullName,
            representativePosition,
        } = contract.contractor as any;
        // TODO: add valid type for contractor object

        return [
            createRussianLegalEntityModification(contractorID, {
                actualAddress,
                russianBankAccount: createRussianBankAccountModification(russianBankAccount),
                inn,
                postAddress,
                registeredName,
                registeredNumber,
                representativeDocument,
                representativeFullName,
                representativePosition,
            }),
            createContractCreationModification(contractID, {
                contractorID,
            }),
            ...payoutChangeset,
            createShopCreationModification(shopID, {
                category: {
                    categoryID: 1,
                },
                location: makeShopLocation({ url }),
                details: { name },
                contractID,
                payoutToolID,
            }),
        ];
    }
}