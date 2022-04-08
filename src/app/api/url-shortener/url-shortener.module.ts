import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-url-shortener';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.urlShortenerEndpoint}/v1` }),
        },
    ],
})
export class UrlShortenerModule {}
