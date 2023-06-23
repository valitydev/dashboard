export interface ApiExtension {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selector: (...args: unknown[]) => Record<PropertyKey, any>;
}
