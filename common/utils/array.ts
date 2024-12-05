/**
 * Remove all duplicated elements from an array
 * @param array The array to filter
 * @returns The filtered array
 */
export const removeDuplicated = <T>(array: T[]): T[] => {
  return array.filter((item, position) => {
    return array.indexOf(item) === position;
  });
};
