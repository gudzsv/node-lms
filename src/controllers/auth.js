import { ONE_DAY } from '../constants/index.js';
import {
	loginUser,
	logoutUser,
	refreshUserSession,
	registerUser,
	requestResetToken,
} from '../services/auth.js';

const setupSession = (res, session) => {
	res.cookie('refreshToken', session.refreshToken, {
		httpOnly: true,
		expires: new Date(Date.now() + ONE_DAY),
	});

	res.cookie('sessionId', session._id, {
		httpOnly: true,
		expires: new Date(Date.now() + ONE_DAY),
	});
};

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

export const logoutUserController = async (req, res) => {
	if (req.cookies.sessionId) {
		await logoutUser(req.cookies.sessionId);
	}
	// console.log('req.headers.cookie.: ', req.headers.cookie);
	// console.log('req.headers.: ', req.headers);
	console.log('req.cookies.sessionId', req.cookies.sessionId);

	res.clearCookie('sessionId');
	res.clearCookie('refreshToken');

	res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
	const session = await refreshUserSession({
		sessionId: req.cookies.sessionId,
		refreshToken: req.cookies.refreshToken,
	});

	setupSession(res, session);

	res.json({
		status: 200,
		message: 'Session successfully refreshed!',
		data: {
			accessToken: session.accessToken,
		},
	});
};

export const requestResetEmailController = async (req,res)=>{
	await  requestResetToken(req.body.email);

	res.status(200).json({
		status: 200,
		message: 'Reset password email was successfully sent!',
		data:{}
	})
}
