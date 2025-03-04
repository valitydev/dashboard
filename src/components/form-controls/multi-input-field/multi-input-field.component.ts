import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl } from '@angular/forms';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'dsh-multi-input-field',
    templateUrl: 'multi-input-field.component.html',
    styleUrls: ['multi-input-field.component.scss'],
    providers: createControlProviders(() => MultiInputFieldComponent),
    standalone: false,
})
export class MultiInputFieldComponent extends FormControlSuperclass<string[]> implements OnInit {
    @Input() label: string;

    formControl = new FormArray([new FormControl('')]);

    constructor(private dr: DestroyRef) {
        super();
    }

    ngOnInit(): void {
        this.formControl.valueChanges
            .pipe(
                map((value) => value.filter(Boolean)),
                distinctUntilChanged(isEqual),
                takeUntilDestroyed(this.dr),
            )
            .subscribe((value) => this.emitOutgoingValue(value));
    }

    handleIncomingValue(value: string[]): void {
        this.formControl.clear();
        for (const v of value?.length ? value : ['']) {
            this.addControl(v);
        }
    }

    addControl(value?: string): void {
        this.formControl.push(new FormControl(value));
    }

    removeControl(idx: number): void {
        if (this.formControl.controls.length > 1) {
            this.formControl.removeAt(idx);
        } else {
            this.handleIncomingValue(['']);
        }
    }
}
