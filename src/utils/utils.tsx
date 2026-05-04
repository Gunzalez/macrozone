export function prepareValue(value: string): number {
  return Math.abs(Number(value)) || 0;
}
