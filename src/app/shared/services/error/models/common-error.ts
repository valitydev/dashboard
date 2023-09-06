import { CustomError } from './custom-error';

const DEFAULT_ERROR_CODE = 'common_error';

/**
 * @deprecated
 */
export class CommonError extends CustomError {
    readonly message: string;
    readonly code: string;

    constructor(message: string, code: string = DEFAULT_ERROR_CODE) {
        super(message);
        this.code = code;
    }
}
