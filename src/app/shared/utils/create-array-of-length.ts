export function createArrayOfLength(length: number, fillValue: unknown = null): (unknown | null)[] {
    return new Array(length).fill(fillValue);
}
