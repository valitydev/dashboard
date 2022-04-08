import { Injectable } from '@angular/core';
import { ShortenerService as ApiShortenerService } from '@vality/swag-url-shortener';

import { createApi } from '../utils';

@Injectable()
export class ShortenerService extends createApi(ApiShortenerService) {}
