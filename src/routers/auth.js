import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
	loginUserController,
	logoutUserController,
	registerUserController,
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

export default router;
