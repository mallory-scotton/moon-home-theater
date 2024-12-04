// Dependencies
import { Model, FindOptions } from 'sequelize';

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

// Paginated response interface
interface PaginatedResponse<T> {
  page: number;
  results: T[];
  totalResults: number;
  totalPages: number;
}

/**
 * Paginate results from a Sequelize model.
 * @param model - The Sequelize model to paginate.
 * @param options - Additional options for querying.
 * @param page - The current page number (default is 1).
 * @param limit - The number of results per page (default is 10).
 * @returns A promise that resolves to the paginated results.
 */
export const paginate = async <T extends Model>(
  model: { findAndCountAll: (options: FindOptions<T>) => Promise<{ count: number; rows: T[] }> },
  options: FindOptions<T> = {},
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<T>> => {
  const offset = (page - 1) * limit;

  // Fetch results from the database with pagination
  const { count: totalResults, rows: results } = await model.findAndCountAll({
    ...options,
    limit: limit,
    offset: offset
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / limit);

  // Return the pagination response
  return {
    page: page,
    results: results,
    totalResults: totalResults,
    totalPages: totalPages
  };
};
