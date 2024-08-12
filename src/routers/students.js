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

// router.use('/students/:studentId', isValidId('studentId'));

router.get('/', ctrlWrapper(getStudentsController));

router.get(
	'/:studentId',
	isValidId('studentId'),
	ctrlWrapper(getStudentByIdController)
);

router.post(
	'/',
	validateBody(createStudentSchema),
	ctrlWrapper(createStudentController)
);

router.delete(
	'/:studentId',
	isValidId('studentId'),
	ctrlWrapper(deleteStudentController)
);

router.put(
	'/:studentId',
	isValidId('studentId'),
	validateBody(createStudentSchema),
	ctrlWrapper(upsertStudentController)
);

router.patch(
	'/:studentId',
	isValidId('studentId'),
	validateBody(updateStudentSchema),
	ctrlWrapper(patchStudentController)
);

export default router;
