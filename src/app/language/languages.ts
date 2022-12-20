import { ValuesType } from 'utility-types';

export const LANGUAGES = ['ru', 'en'] as const;
export type Language = ValuesType<typeof LANGUAGES>;
