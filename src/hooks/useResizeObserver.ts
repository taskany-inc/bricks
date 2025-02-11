import { useCallback, useEffect, useRef } from 'react';

export const useResizeObserver = (cb: (entry: ResizeObserverEntry) => void) => {
    const observerRef = useRef<ResizeObserver>();

    const ref = useCallback(
        (element: HTMLElement | null) => {
            if (!observerRef.current) {
                observerRef.current = new ResizeObserver((entries) => {
                    entries.forEach(cb);
                });
            }
            if (element) observerRef.current.observe(element);
        },
        [cb],
    );

    useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, [cb]);

    return ref;
};
