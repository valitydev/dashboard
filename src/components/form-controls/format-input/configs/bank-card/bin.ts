import { regExpToValidator } from '../../../utils';

const BIN_LENGTH = 6;

export const binValidator = regExpToValidator(new RegExp(`^\\d{${BIN_LENGTH}}$`));
