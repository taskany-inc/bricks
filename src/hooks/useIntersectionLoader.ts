import { useCallback, useRef } from 'react';

export const useIntersectionLoader = <T extends HTMLElement>(
    cb: () => void,
    enabled: boolean,
    options?: IntersectionObserverInit,
) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const callbackRef = useRef<() => void>(cb);

    return useCallback(
        (node: T) => {
            if (!enabled) return;

            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callbackRef.current();
                }
            }, options);

            if (node) {
                observerRef.current.observe(node);

                const { top } = node.getBoundingClientRect();

                if (top < 0) {
                    callbackRef.current();
                }
            }
        },
        [enabled, options],
    );
};
