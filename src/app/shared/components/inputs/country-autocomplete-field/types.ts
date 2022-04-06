import { Country } from '@vality/swag-payments';

export type CountryId = Country['id'];
export type CountryName = Country['name'];
export type DisplayWithFn = (value: CountryId) => string;
