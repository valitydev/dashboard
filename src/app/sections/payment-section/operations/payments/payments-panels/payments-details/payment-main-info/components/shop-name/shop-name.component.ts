import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-shop-name',
    templateUrl: 'shop-name.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class ShopNameComponent {
    @Input() shopName: string;
}
