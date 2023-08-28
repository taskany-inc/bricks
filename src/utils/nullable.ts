import React from 'react';

// eslint-disable-next-line no-shadow
export function nullable<V>(v: V, render: (v: NonNullable<V>) => React.ReactNode) {
    if (!v) return null;

    if (Array.isArray(v) && !v.length) return null;

    return render(v as NonNullable<V>);
}
