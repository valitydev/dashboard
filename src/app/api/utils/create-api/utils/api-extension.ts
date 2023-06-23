export interface ApiExtension {
    selector: (...args: unknown[]) => Record<PropertyKey, unknown>;
}
