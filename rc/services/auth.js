import { UserCollection } from '../../src/db/models/users.js';

export const registerUser = async (payload) => {
	return await UserCollection.create(payload);
};
