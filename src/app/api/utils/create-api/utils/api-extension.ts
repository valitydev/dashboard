export interface ApiExtension {
    selector: (...args: any[]) => Record<PropertyKey, any>;
}
