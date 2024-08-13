import { ONE_DAY } from '../constants/index.js';
import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
	const user = await registerUser(req.body);

	res.status(200).json({
		status: 200,
		message: 'User successfully created',
		data: user,
	});
};

export const loginUserController = async (req, res) => {
	const session = await loginUser(req.body);

	res.cookie('refreshToken', session.refreshToken, {
		httpOnly: true,
		expires: new Date(Date.now() + ONE_DAY),
	});

	res.cookie('sessionId', session._id, {
		httpOnly: true,
		expires: new Date(Date.now() + ONE_DAY),
	});

	res.json({
		status: 200,
		message: 'Successfully logged in an user!',
		data: {
			accessToken: session.accessToken,
		},
	});
};
