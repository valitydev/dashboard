import { BANK_CONFIGS } from './bank';
import { BANK_CARD_CONFIGS } from './bank-card';
import { COMMON_CONFIGS } from './common';
import { INDIVIDUAL_ENTITY_CONFIGS } from './individual-entity';
import { LEGAL_ENTITY_CONFIGS } from './legal-entity';

export const CONFIGS = {
    ...COMMON_CONFIGS,
    ...BANK_CONFIGS,
    ...BANK_CARD_CONFIGS,
    ...INDIVIDUAL_ENTITY_CONFIGS,
    ...LEGAL_ENTITY_CONFIGS,
};

export type Type = keyof typeof CONFIGS;
