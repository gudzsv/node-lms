import createHttpError from 'http-errors';
import {
	createStudent,
	deleteStudent,
	getAllStudents,
	getStudentById,
	updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getStudentsController = async (req, res, next) => {
	const { page, perPage } = parsePaginationParams(req.query);

	const students = await getAllStudents({ page, perPage });

	res.json({
		status: 200,
		message: 'Successfully found students!',
		data: students,
	});
};

export const getStudentByIdController = async (req, res, next) => {
	const { studentId } = req.params;
	const student = await getStudentById(studentId);
	if (!student) {
		throw createHttpError(404, 'Student not found');
	}

	res.json({
		status: 200,
		message: `Successfully found student with id ${studentId}!`,
		data: student,
	});
};

export const createStudentController = async (req, res) => {
	const student = await createStudent(req.body);

	res.status(201).json({
		status: 201,
		message: `Successfully created a student!`,
		data: student,
	});
};

export const deleteStudentController = async (req, res, next) => {
	const { studentId } = req.params;
	const student = await deleteStudent(studentId);
	if (!student) {
		next(createHttpError(404, 'Student not found'));
		return;
	}

	res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
	const { studentId } = req.params;

	const result = await updateStudent(studentId, req.body, { upsert: true });

	if (!result) {
		next(createHttpError(404, 'Student not found'));
		return;
	}

	const status = result?.isNew ? 201 : 200;

	res.status(status).json({
		status,
		message: `Successfully upserted a student!`,
		data: result.student,
	});
};

export const patchStudentController = async (req, res, next) => {
	const { studentId } = req.params;

	const result = await updateStudent(studentId, req.body);

	if (!result) {
		next(createHttpError(404, 'Student not found'));
		return;
	}

	res.status(200).json({
		status: 200,
		message: `Successfully patched a student!`,
		data: result.student,
	});
};
