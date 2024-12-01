// Interface of the expression list
interface ExpressionList {
  [key: string]: {
    value: string;
    exp: RegExp;
  };
}

// Interface for the extraction result
interface ExtractResult {
  value: string;
  source: RegExpExecArray;
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
        source: match
      };
    }
  }
};
