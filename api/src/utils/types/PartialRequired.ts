/**
 * Returns an interface with specified keys passed from optionnal to required
 * Example : We have a Car interface with optional 'airbag' key.
 * With `PartialRequired<Car, 'airbag'>` 'airbag' becomes required.
 */

export type PartialRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
