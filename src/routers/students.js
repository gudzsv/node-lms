import { Router } from 'express';
import {
	createStudentController,
	deleteStudentController,
	getStudentByIdController,
	getStudentsController,
	patchStudentController,
	upsertStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
	createStudentSchema,
	updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));

router.get(
	'/students/:studentId',
	isValidId,
	ctrlWrapper(getStudentByIdController)
);

router.post(
	'/students',
	validateBody(createStudentSchema),
	ctrlWrapper(createStudentController)
);

router.delete(
	'/students/:studentId',
	isValidId,
	ctrlWrapper(deleteStudentController)
);

router.put(
	'/students/:studentId',
	isValidId,
	ctrlWrapper(upsertStudentController)
);

router.patch(
	'/students/:studentId',
	isValidId,
	validateBody(updateStudentSchema),
	ctrlWrapper(patchStudentController)
);

export default router;
