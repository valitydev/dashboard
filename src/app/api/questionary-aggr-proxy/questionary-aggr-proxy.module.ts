import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-questionary-aggr-proxy';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/dark-api/v1` }),
        },
    ],
})
export class QuestionaryAggrProxyModule {}
