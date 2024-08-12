import { Router } from 'express';
import studentsRouter from '../routers/students.js';
import authRouter from '../routers/auth.js';

const router = Router();

router.use('/students', studentsRouter);
router.use('/auth', authRouter);

export default router;
