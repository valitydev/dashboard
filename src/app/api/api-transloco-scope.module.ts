import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';

@NgModule({
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'dictionary' }],
})
/**
 * Used only to create a transloco-keys-manager scope file -
 * no need to import anywhere (yet the library doesn't need it)
 */
export class ApiTranslocoScopeModule {}
