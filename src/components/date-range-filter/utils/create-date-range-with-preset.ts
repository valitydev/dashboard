import { createDateRangeByPreset } from './create-date-range-by-preset';
import { DateRangeWithPreset } from '../types/date-range-with-preset';
import { Preset } from '../types/preset';

export function createDateRangeWithPreset(preset: Preset): DateRangeWithPreset {
    const dateRange = createDateRangeByPreset(preset);
    return { ...dateRange, preset };
}
