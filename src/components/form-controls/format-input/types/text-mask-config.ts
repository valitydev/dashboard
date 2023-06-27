export class TextMaskConfig {
    mask: Array<string | RegExp> | ((raw: string) => Array<string | RegExp>) | false;
    guide?: boolean;
    placeholderChar?: string;
    pipe?: (conformedValue: string, config: TextMaskConfig) => false | string | object;
    keepCharPositions?: boolean;
    showMask?: boolean;
}
