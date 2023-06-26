import { TextMaskConfig } from '../types/text-mask-config';

export interface FormatInputConfig<I = string, E = string> {
    mask: TextMaskConfig;
    placeholder?: string;
    sizeFromPlaceholder?: boolean;
    size?: number;
    prefix?: string;
    postfix?: string;
    toPublicValue?: (value: I) => E;
    toInternalValue?: (value: E) => I;
}
