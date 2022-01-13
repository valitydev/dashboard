import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-route-navbar-layout',
    templateUrl: 'route-navbar-layout.component.html',
    styleUrls: ['route-navbar-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteNavbarLayoutComponent {
    @Input() routeName: string;
}
