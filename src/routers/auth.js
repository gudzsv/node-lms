import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
	loginUserSchema,
	registerUserSchema,
	requestResetEmailSchema,
} from '../validation/auth.js';
import {
	loginUserController,
	logoutUserController,
	refreshUserSessionController,
	registerUserController,
	requestResetEmailController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
	'/register',
	validateBody(registerUserSchema),
	ctrlWrapper(registerUserController)
);

router.post(
	'/login',
	validateBody(loginUserSchema),
	ctrlWrapper(loginUserController)
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
	'/request-reset-email',
	validateBody(requestResetEmailSchema),
	ctrlWrapper(requestResetEmailController)
);
export default router;
