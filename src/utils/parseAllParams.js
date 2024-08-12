import { parseFilterParams } from './parseFilterParams.js';
import { parsePaginationParams } from './parsePaginationParams.js';
import { parseSortParams } from './parseSortParams.js';

export const parseAllParams = (query) => {
	const pagination = parsePaginationParams(query);
	const sort = parseSortParams(query);
	const filter = parseFilterParams(query);

	return { ...pagination, ...sort, filter };
};
