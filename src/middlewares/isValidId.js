import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId =
	(idName = 'id') =>
	(req, res, next) => {
		const id = req.params[idName];

		if (!id) {
			throw new Error('id in isValidId is not provided');
		}

		if (!isValidObjectId(id)) {
			throw createHttpError(404, 'Not Found');
		}

		return next();
	};
