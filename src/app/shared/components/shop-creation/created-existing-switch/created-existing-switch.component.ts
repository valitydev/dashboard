import { ChangeDetectionStrategy, Component, ContentChild, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CreatedCaseDirective } from '@dsh/app/shared/components/shop-creation/created-existing-switch/directives/created-case.directive';
import { ExistingCaseDirective } from '@dsh/app/shared/components/shop-creation/created-existing-switch/directives/existing-case.directive';
import { ComponentChanges } from '@dsh/type-utils';
import { switchControl } from '@dsh/utils';

export enum Type {
    Created,
    Existing,
}

export type TypeUnion<C, E> = {
    type: Type;
    created?: C;
    existing?: E;
};

export function createTypeUnionDefaultForm<C, E>(optional = false) {
    return new FormGroup({
        type: new FormControl<Type>(null, optional ? undefined : Validators.required),
        created: new FormControl<C>({ value: null, disabled: true }),
        existing: new FormControl<E>({ value: null, disabled: true }),
    });
}

@Component({
    selector: 'dsh-created-existing-switch',
    templateUrl: 'created-existing-switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatedExistingSwitchComponent<N, E> implements OnChanges {
    @Input() form: FormGroup<{
        type: FormControl<Type>;
        created: FormControl<N>;
        existing: FormControl<E>;
    }>;
    type = Type;

    @ContentChild(CreatedCaseDirective) createdCase!: CreatedCaseDirective;
    @ContentChild(ExistingCaseDirective) existingCase!: ExistingCaseDirective;

    ngOnChanges({ form }: ComponentChanges<CreatedExistingSwitchComponent<N, E>>): void {
        if (form && form.currentValue) this.typeChanged(form.currentValue.value.type);
    }

    typeChanged(type: Type): void {
        switchControl(type, [
            [Type.Created, this.form.controls.created],
            [Type.Existing, this.form.controls.existing],
        ]);
    }
}
