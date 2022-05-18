export function isError(x: any): x is Error {
  return x instanceof Error;
}
