import { Injectable } from '@angular/core';

import { ShortenerService } from '@dsh/api-codegen/url-shortener';
import { IdGeneratorService } from '@dsh/app/shared';

@Injectable()
export class UrlShortenerService {
    constructor(private shortenerService: ShortenerService, private idGenerator: IdGeneratorService) {}

    shortenUrl(sourceUrl: string, expiresAt: string) {
        return this.shortenerService.shortenUrl(this.idGenerator.shortUuid(), {
            sourceUrl,
            expiresAt: expiresAt as any as Date,
        });
    }
}
