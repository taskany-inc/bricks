export type Nullish<T> = { [P in keyof T]?: T[P] | undefined | null };
