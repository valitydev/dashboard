import { Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

import { CustomFormControl } from '../utils';

import { CONFIGS, Type } from './configs';
import { TextMaskConfig } from './types/text-mask-config';

@Component({
    selector: 'dsh-format-input',
    templateUrl: 'format-input.component.html',
    styleUrls: ['format-input.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: FormatInputComponent }],
})
/**
 * @deprecated
 */
export class FormatInputComponent extends CustomFormControl<unknown> {
    mask: TextMaskConfig;
    prefix = '';
    postfix = '';
    size: string = null;

    private _format: Type;
    @Input()
    set format(type: Type) {
        this._format = type;
        this.setType(type);
    }
    get format(): Type {
        return this._format;
    }

    private setType(type: Type) {
        const c = CONFIGS[type];
        const { placeholder, prefix, postfix, size, mask, toInternalValue, toPublicValue } = c;
        const sizeFromPlaceholder =
            c.sizeFromPlaceholder === undefined ? true : c.sizeFromPlaceholder;
        const estimatedSize =
            sizeFromPlaceholder && !size && placeholder ? placeholder.length : size;

        this.size = (prefix || postfix) && estimatedSize ? String(estimatedSize) : null;
        this.placeholder = this.prepareText(placeholder);
        this.prefix = this.prepareText(prefix);
        this.postfix = this.prepareText(postfix);
        this.mask = mask;
        if (toInternalValue) {
            this.toInternalValue = toInternalValue;
        }
        if (toPublicValue) {
            this.toPublicValue = toPublicValue;
        }
    }

    private prepareText(str: string): string {
        return (typeof str === 'string' ? str.replace(/ /g, '\xa0') : str) || '';
    }
}
