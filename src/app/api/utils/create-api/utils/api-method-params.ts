import { Overwrite } from 'utility-types';

export type ApiMethodParams<
    M extends (params: object) => unknown,
    P extends keyof Parameters<M>[0] = never
> = Overwrite<Parameters<M>[0], { [N in P]?: Parameters<M>[0][N] }>;
