import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserCollection } from '../db/models/users.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

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

	await SessionCollection.deleteOne({ userId: user._id });

	const accessToken = randomBytes(30).toString('base64');
	const refreshToken = randomBytes(30).toString('base64');

	return await SessionCollection.create({
		userId: user._id,
		accessToken,
		refreshToken,
		accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
		refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
	});
};
