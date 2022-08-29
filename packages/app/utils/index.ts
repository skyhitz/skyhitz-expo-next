export function isSome<T>(maybe: T | null | undefined): maybe is T {
  return maybe !== null && maybe !== undefined;
}
