import { useRef, useEffect, useCallback, DependencyList } from 'react';

// this may avoid many re-renders error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<Args extends any[], Return>(fn: (...args: Args) => Return, deps: DependencyList) {
    const ref = useRef(fn);

    useEffect(() => {
        ref.current = fn;
    }, [fn, ...deps]);

    return useCallback((...args: Args) => ref.current(...args), []);
}
