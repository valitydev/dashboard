import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { FileModification } from '@vality/swag-claim-management';
import { Conversation } from '@vality/swag-messages';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, share, switchMap, tap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claim-management';
import { NotificationService } from '@dsh/app/shared';

import { progress } from '../../../../custom-operators';
import { UiError } from '../../../ui-error';
import { ReceiveClaimService } from '../receive-claim.service';
import { RouteParamClaimService } from '../route-param-claim.service';
import { UpdateConversationParams, UpdateFilesParams, UpdateParams } from './model';
import { toChangeset } from './to-changeset';

@Injectable()
export class UpdateClaimService {
    inProgress$: Observable<boolean>;

    private updateBy$ = new Subject<UpdateParams>();
    private error$ = new BehaviorSubject<UiError>({ hasError: false });

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private routeParamClaimService: RouteParamClaimService,
        private claimApiService: ClaimsService,
        private notificationService: NotificationService,
        private transloco: TranslocoService
    ) {
        const updated$ = this.updateBy$.pipe(
            tap(() => this.error$.next({ hasError: false })),
            toChangeset,
            switchMap((changeset) => combineLatest([of(changeset), this.routeParamClaimService.claim$])),
            switchMap(([changeset, { id, revision }]) =>
                this.claimApiService.updateClaimByID({ claimID: id, claimRevision: revision, changeset }).pipe(
                    catchError((ex) => {
                        console.error(ex);
                        const error = { hasError: true, code: 'updateClaimByIDFailed' };
                        this.notificationService.error(
                            this.transloco.translate(`updateClaim.updateClaimByIDFailed`, null, 'claim-section')
                        );
                        this.error$.next(error);
                        return of(error);
                    })
                )
            ),
            share()
        );

        this.inProgress$ = progress(this.updateBy$, updated$);
        updated$.subscribe(() => this.receiveClaimService.receiveClaim());
    }

    updateByConversation(conversationId: Conversation['conversationId']) {
        this.updateBy$.next({
            type: 'updateConversation',
            conversationId,
        } as UpdateConversationParams);
    }

    updateByFiles(
        fileIds: string[],
        fileModificationType: FileModification.FileModificationTypeEnum = FileModification.FileModificationTypeEnum
            .FileCreated
    ) {
        this.updateBy$.next({
            type: 'updateFiles',
            fileIds,
            fileModificationType,
        } as UpdateFilesParams);
    }
}
