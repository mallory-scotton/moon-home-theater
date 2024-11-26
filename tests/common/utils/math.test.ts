// Dependencies
import { describe, test, expect } from '@jest/globals';
import { clamp } from '../../../common/utils/math';

describe('clamp', () => {
  test('should return the value itself when within the range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  test('should return the minimum when value is below range', () => {
    expect(clamp(0, 1, 10)).toBe(1);
  });

  test('should return the maximum when value is above range', () => {
    expect(clamp(15, 1, 10)).toBe(10);
  });

  test('should return the minimum when value is exactly the minimum', () => {
    expect(clamp(1, 1, 10)).toBe(1);
  });

  test('should return the maximum when value is exactly the maximum', () => {
    expect(clamp(10, 1, 10)).toBe(10);
  });

  test('should clamp negative values correctly', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  test('should handle the same minimum and maximum', () => {
    expect(clamp(5, 5, 5)).toBe(5);
    expect(clamp(4, 5, 5)).toBe(5);
    expect(clamp(6, 5, 5)).toBe(5);
  });
});
