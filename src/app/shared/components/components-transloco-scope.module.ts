import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'components' }],
})
/**
 * Used only to create a transloco-keys-manager scope file -
 * no need to import anywhere (yet the library doesn't need it)
 */
export class ComponentsTranslocoScopeModule {}
