import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/users.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
	const existsUser = await UserCollection.findOne({ email: payload.email });

	if (existsUser) throw createHttpError(409, 'This Email exists in system');

	const encryptedPassword = await bcrypt.hash(
		payload.password,
		Number(env('SALT'))
	);
	return await UserCollection.create({
		...payload,
		password: encryptedPassword,
	});
};

export const loginUser = async (payload) => {
	const user = await UserCollection.findOne({ email: payload.email });

	if (!user) throw createHttpError(404, 'User not found');

	const isEqual = await bcrypt.compare(payload.password, user.password);

	if (!isEqual) throw createHttpError(401, 'Unauthorized');
};
