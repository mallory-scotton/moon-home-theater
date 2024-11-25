/**
 * Clamp a value between a minimum and a maximum
 * @param value The value to be clamped
 * @param minimum The minimum value
 * @param maximum The maximum value
 * @returns The clamped value
 */
export const clamp = (
  value: number,
  minimum: number,
  maximum: number
): number => Math.min(Math.max(value, minimum), maximum);
