/**
 * Stringify the parameters of a query
 * @param params The parameters to stringify
 * @returns The stringified parameters
 */
export const stringifyParams = (params: { [key: string]: any }): string => {
  // Delete all empty parameters
  for (const key in params) {
    if (params[key] === undefined || params[key] === null) {
      delete params[key];
    }
  }

  // Stringify the parameters (e.g: '?parameter1=value1&parameter2=value2')
  return (
    '?' +
    Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&')
  );
};
