import { ForwardedRef, MutableRefObject } from 'react';

export function setRefs<T>(ref: MutableRefObject<T | null>, forwardedRef: ForwardedRef<T>) {
    return (el: T) => {
        ref.current = el;
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else if (forwardedRef) forwardedRef.current = el;
    };
}
