type Value<V> = Exclude<NonNullable<V>, false | ''>;

export function nullable<V, R, F = null>(v: V, render: (v: Value<V>) => R, fallback?: F) {
    if (!v) return fallback || null;

    if (Array.isArray(v) && !v.length) return fallback || null;

    return render(v as Value<V>);
}
