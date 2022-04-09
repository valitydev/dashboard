/**
 * @deprecated New codegen support string date
 */
export function toDateLike(date: string) {
    return {
        toISOString: () => date,
        toString: () => date,
    } as Date;
}
