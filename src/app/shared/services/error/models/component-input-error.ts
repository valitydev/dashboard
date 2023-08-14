import { Type } from '@angular/core';

import { CustomError } from '@dsh/app/shared/services/error/models/custom-error';

export class ComponentInputError extends CustomError {
    readonly classRef: Type<unknown>;

    constructor(message: string, classRef: Type<unknown>) {
        super(message);
        this.classRef = classRef;
    }
}
