import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-shop-row-header',
    templateUrl: 'shop-row-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ShopRowHeaderComponent {}
