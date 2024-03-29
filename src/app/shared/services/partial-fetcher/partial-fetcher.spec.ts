import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { FetchResult } from './fetch-result';
import { PartialFetcher } from './partial-fetcher';

function assertDeepEqual(actual: unknown, expected: unknown) {
    expect(actual).toEqual(expected);
}

function createScheduler() {
    return new TestScheduler(assertDeepEqual);
}

describe('PartialFetch', () => {
    class PartialFetched extends PartialFetcher<unknown, unknown> {
        constructor(
            private fetchFn: (params?: unknown, continuationToken?: string) => Observable<unknown>,
            debounce?: number,
        ) {
            super(debounce);
        }

        protected fetch(params: unknown, continuationToken: string) {
            return this.fetchFn(params, continuationToken);
        }
    }

    it('should init', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const result: FetchResult<unknown> = { result: ['test'] };
            const partialFetched = new PartialFetched(() => cold('--x|', { x: result }), 100);
            expectObservable(partialFetched.searchResult$).toBe('');
            expectObservable(partialFetched.errors$).toBe('');
            expectObservable(partialFetched.doAction$).toBe('0', [true]);
            expectObservable(partialFetched.hasMore$).toBe('0', [null]);
        });
    });

    it('should search with debounce', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const result: FetchResult<unknown> = { result: ['test'] };
            const partialFetched = new PartialFetched(() => cold('--x|', { x: result }), 100);
            partialFetched.search(null);
            expectObservable(partialFetched.searchResult$).toBe('100ms --0', [['test']]);
            expectObservable(partialFetched.errors$).toBe('');
            expectObservable(partialFetched.doAction$).toBe('0 100ms -1', [true, false]);
            expectObservable(partialFetched.hasMore$).toBe('0 100ms -1', [null, false]);
        });
    });

    it('should load more with last token', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const partialFetched = new PartialFetched(
                (_params, token) =>
                    cold('--x|', {
                        x: { result: [token], continuationToken: token ? token + '0' : 'token' },
                    }),
                0,
            );
            partialFetched.search('token');
            partialFetched.fetchMore();
            partialFetched.fetchMore();
            partialFetched.fetchMore();
            expectObservable(partialFetched.searchResult$).toBe('--0-1-2-3', [
                [undefined],
                [undefined, 'token'],
                [undefined, 'token', 'token0'],
                [undefined, 'token', 'token0', 'token00'],
            ]);
            expectObservable(partialFetched.errors$).toBe('');
            expectObservable(partialFetched.doAction$).toBe('0-1', [true, false]);
            expectObservable(partialFetched.hasMore$).toBe('0-1', [null, true]);
        });
    });

    it('should reload with old params', () => {
        createScheduler().run(({ cold, expectObservable }) => {
            const partialFetched = new PartialFetched(
                (params) =>
                    cold('--x|', {
                        x: { result: [params], continuationToken: 'token' } as FetchResult<unknown>,
                    }),
                0,
            );
            partialFetched.search('params');
            partialFetched.fetchMore();
            partialFetched.refresh();
            expectObservable(partialFetched.searchResult$).toBe('--0-1-2', [
                ['params'],
                ['params', 'params'],
                ['params'],
            ]);
            expectObservable(partialFetched.errors$).toBe('');
            expectObservable(partialFetched.doAction$).toBe('0-1', [true, false]);
            expectObservable(partialFetched.hasMore$).toBe('0-1', [null, true]);
        });
    });

    describe('throw error', () => {
        it('should return error with delay', () => {
            createScheduler().run(({ cold, expectObservable }) => {
                const partialFetched = new PartialFetched(() => cold('--#|'), 100);
                partialFetched.search(null);
                expectObservable(partialFetched.searchResult$).toBe('100ms --0', [[]]);
                expectObservable(partialFetched.errors$).toBe('100ms --0', ['error']);
                expectObservable(partialFetched.doAction$).toBe('0 100ms -1', [true, false]);
                expectObservable(partialFetched.hasMore$).toBe('0 100ms -1', [null, false]);
            });
        });

        it('should fetch after error', () => {
            createScheduler().run(({ cold, expectObservable }) => {
                const partialFetched = new PartialFetched(() => cold('--#|'), 0);
                partialFetched.search(null);
                partialFetched.fetchMore();
                expectObservable(partialFetched.searchResult$).toBe('--0-1', [[], []]);
                expectObservable(partialFetched.errors$).toBe('--0-1', ['error', 'error']);
                expectObservable(partialFetched.doAction$).toBe('0-1', [true, false]);
                expectObservable(partialFetched.hasMore$).toBe('0-1', [null, false]);
            });
        });
    });
});
