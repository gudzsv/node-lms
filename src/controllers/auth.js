import { registerUser } from '../../rc/services/auth.js';

export const registerUserController = async (req, res) => {
	const user = await registerUser(req.body);

	res.status(201).json({
		status: 201,
		message: 'User successfully created',
		data: user,
	});
};
