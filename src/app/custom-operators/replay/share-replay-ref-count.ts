import { MonoTypeOperatorFunction, ReplaySubject, timer } from 'rxjs';
import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';
import { share } from 'rxjs/operators';

/**
 * @deprecated use shareReplayRefCount()
 */
export const SHARE_REPLAY_CONF: ShareReplayConfig = { bufferSize: 1, refCount: true };

export function shareReplayRefCount<T>(
    params: Pick<ShareReplayConfig, 'bufferSize'> & { resetOnRefCountZeroTimer?: number } = {},
): MonoTypeOperatorFunction<T> {
    const state = new ReplaySubject<T>(1);
    return share({
        connector: () => state,
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: () => timer(params.resetOnRefCountZeroTimer ?? 10_000),
    });
}
