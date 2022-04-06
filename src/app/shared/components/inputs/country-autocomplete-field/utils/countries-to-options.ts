import { Country } from '@vality/swag-payments';

import { Option } from '@dsh/components/form-controls/select-search-field';

const countryToOption = (country: Country): Option<string> => ({
    label: `${country?.id} - ${country?.name}`,
    value: country?.id,
});

export const countriesToOptions = (countries: Country[]): Option<string>[] => countries.map(countryToOption);
