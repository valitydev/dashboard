import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-brand',
    templateUrl: 'brand.component.html',
    styleUrls: ['./brand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
    @Input() navigationLink = '/';
}
