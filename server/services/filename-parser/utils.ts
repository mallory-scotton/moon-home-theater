// Interface of the expression list
interface ExpressionList {
  [key: string]: {
    value: string;
    exp: RegExp;
  };
}

// Type of the expression and field list
type ExpressionField = { field: string; exp: RegExp }[];

// Interface for the extraction result
interface ExtractResult {
  value: string;
  source: string;
}

/**
 * Get the value of a string based on the expression list
 * @param str The string to extract value from
 * @param expressions The list of expressions to tests
 */
export const extractValueFrom = (str: string, expressions: ExpressionList): ExtractResult | undefined => {
  for (const key in expressions) {
    const match = expressions[key].exp.exec(str);

    if (match) {
      return {
        value: expressions[key].value,
        source: match[0]
      };
    }
  }
  return undefined;
};

/**
 * Filter an object to remove empty ones
 * @param obj The object to filter
 * @returns The filtered object
 */
export const filterEmpty = (obj: Object) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));

/**
 * Get the fields activated based on the expression fields list
 * @param str The string to extract the field from
 * @param expressions The expressions to tests the field with
 */
export const extractFieldFrom = (str: string, expressions: ExpressionField): { [key: string]: boolean } | undefined => {
  let result: { [key: string]: boolean } = {};

  for (const key of expressions) {
    const match = key.exp.test(str);

    if (match) {
      result[key.field] = true;
    }
  }

  return Object.keys(result).length > 0 ? filterEmpty(result) : undefined;
};

/**
 * Remove duplicated element from a list
 * @param arr The array to remove duplicated element from
 * @returns The filtered array
 */
const removeDuplicated = (arr: string[]): string[] => {
  const unique: string[] = arr.reduce((acc: string[], curr: string) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return (unique);
}

/**
 * Extract a list of values from a string
 * @param str The string to extract value list from
 * @param expressions The list of expressions and values to test
 * @returns A list of values or undefined
 */
export const extractValueListFrom = (str: string, expressions: ExpressionList): string[] | undefined => {
  const list: string[] = [];

  for (const key in expressions) {
    if (expressions[key].exp.test(str)) {
      list.push(expressions[key].value);
    }
  }

  return list.length > 0 ? removeDuplicated(list) : undefined;
};
