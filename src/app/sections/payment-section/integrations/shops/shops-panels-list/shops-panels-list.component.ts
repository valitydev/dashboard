import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { ShopsPanelsListService } from './shops-panels-list.service';

@Component({
    selector: 'dsh-shops-panels-list',
    templateUrl: 'shops-panels-list.component.html',
    providers: [ShopsPanelsListService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsPanelsListComponent {
    shops$ = this.shopsPanelsListService.shops$;
    selectedPanelPosition$ = this.shopsPanelsListService.selectedPanelPosition$;
    hasMore$ = this.shopsPanelsListService.hasMore$;

    constructor(
        private shopsPanelsListService: ShopsPanelsListService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }

    select(idx: number) {
        this.shopsPanelsListService.select(idx);
    }

    suspend(id: string) {
        this.shopsPanelsListService.suspend(id);
    }

    activate(id: string) {
        this.shopsPanelsListService.activate(id);
    }

    showMore() {
        this.shopsPanelsListService.showMore();
    }
}