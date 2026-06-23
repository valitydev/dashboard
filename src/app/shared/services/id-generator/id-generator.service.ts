import short from 'short-uuid';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdGeneratorService {
    uuid(): string {
        return short().uuid();
    }

    shortUuid(): string {
        return short().generate();
    }
}
