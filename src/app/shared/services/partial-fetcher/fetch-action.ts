export interface FetchAction<P = void> {
    type: 'search' | 'fetchMore';
    value?: P;
}
