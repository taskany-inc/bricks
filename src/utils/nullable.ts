import React from 'react';

// eslint-disable-next-line no-shadow
export function nullable<V>(v: V, render: (v: Exclude<NonNullable<V>, false>) => React.ReactNode) {
    if (!v) return null;

    if (Array.isArray(v) && !v.length) return null;

    return render(v as Exclude<NonNullable<V>, false>);
}
