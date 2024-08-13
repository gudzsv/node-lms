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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getStudentsController));

router.get(
	'/:studentId',
	checkRoles(ROLES.TEACHER, ROLES.PARENT),
	isValidId('studentId'),
	ctrlWrapper(getStudentByIdController)
);

router.post(
	'/',
	checkRoles(ROLES.TEACHER, ROLES.PARENT),
	validateBody(createStudentSchema),
	ctrlWrapper(createStudentController)
);

router.delete(
	'/:studentId',
	checkRoles(ROLES.TEACHER, ROLES.PARENT),
	isValidId('studentId'),
	ctrlWrapper(deleteStudentController)
);

router.put(
	'/:studentId',
	checkRoles(ROLES.TEACHER, ROLES.PARENT),
	isValidId('studentId'),
	validateBody(createStudentSchema),
	ctrlWrapper(upsertStudentController)
);

router.patch(
	'/:studentId',
	checkRoles(ROLES.TEACHER, ROLES.PARENT),
	isValidId('studentId'),
	validateBody(updateStudentSchema),
	ctrlWrapper(patchStudentController)
);

export default router;
