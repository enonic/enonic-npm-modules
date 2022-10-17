export type Unwrapped<T> = T extends (Array<infer U> | ReadonlyArray<infer U>) ? U : T;

export type Flattened<T> = T extends (Array<infer U> | ReadonlyArray<infer U>) ? Flattened<U> : T;

export type WithRequiredProperty<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type KeysOfType<O, T> = { [K in keyof O]: O[K] extends T ? K : never }[keyof O];

export type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export type OneOrMore<T> = T | T[];
