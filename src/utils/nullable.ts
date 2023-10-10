// eslint-disable-next-line no-shadow
export function nullable<V, R, F = null>(v: V, render: (v: Exclude<NonNullable<V>, false>) => R, fallback?: F) {
    if (!v) return fallback || null;

    if (Array.isArray(v) && !v.length) return fallback || null;

    return render(v as Exclude<NonNullable<V>, false>);
}
