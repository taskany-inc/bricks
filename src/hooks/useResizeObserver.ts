import { RefObject, useEffect, useRef } from 'react';

export const useResizeObserver = (ref: RefObject<HTMLElement>, cb: (entry: ResizeObserverEntry) => void) => {
    const observerRef = useRef<ResizeObserver>();

    useEffect(() => {
        observerRef.current = new ResizeObserver((entries) => {
            entries.forEach(cb);
        });
        if (ref.current) observerRef.current.observe(ref.current);
        return () => observerRef.current?.disconnect();
    }, []);
};
