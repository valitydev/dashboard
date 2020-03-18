import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, switchMap, tap } from 'rxjs/operators';

import { ClaimsService } from '../../../api';
import { ConversationID } from '../../../api-codegen/messages';
import { progress } from '../../../custom-operators';
import { UIError } from '../../ui-error';
import { ReceiveClaimService } from '../receive-claim.service';
import { RouteParamClaimService } from '../route-param-claim.service';
import { UpdateConversationParams, UpdateFilesParams, UpdateParams } from './model';
import { toChangeset } from './to-changeset';

@Injectable()
export class UpdateClaimService {
    private updateBy$: Subject<UpdateParams> = new Subject();
    private error$: BehaviorSubject<UIError> = new BehaviorSubject({ hasError: false });

    errorCode$: Observable<string> = this.error$.pipe(
        filter(err => err.hasError),
        pluck('code')
    );
    inProgress$: Observable<boolean> = progress(this.updateBy$, this.error$);

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private routeParamClaimService: RouteParamClaimService,
        private claimApiService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.updateBy$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                toChangeset,
                switchMap(changeset => combineLatest(of(changeset), this.routeParamClaimService.claim$)),
                switchMap(([changeset, { id, revision }]) =>
                    this.claimApiService.updateClaimByID(id, revision, changeset).pipe(
                        catchError(ex => {
                            console.error(ex);
                            const error = { hasError: true, code: 'updateClaimByIDFailed' };
                            this.error$.next(error);
                            return of(error);
                        })
                    )
                )
            )
            .subscribe(() => this.receiveClaimService.receiveClaim());
        this.errorCode$.subscribe(code =>
            this.snackBar.open(this.transloco.translate(`errors.${code}`), 'OK', {
                duration: 5000
            })
        );
    }

    updateByConversation(conversationId: ConversationID) {
        this.updateBy$.next({
            type: 'updateConversation',
            conversationId
        } as UpdateConversationParams);
    }

    updateByFiles(fileIds: string[]) {
        this.updateBy$.next({
            type: 'updateFiles',
            fileIds
        } as UpdateFilesParams);
    }
}
