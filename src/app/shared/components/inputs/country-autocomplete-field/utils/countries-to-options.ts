import { Option } from '@vality/matez';
import { Country } from '@vality/swag-payments';

const countryToOption = (country: Country): Option<string> => ({
    label: `${country?.id} - ${country?.name}`,
    value: country?.id,
});

export const countriesToOptions = (countries: Country[]): Option<string>[] =>
    countries.map(countryToOption);
