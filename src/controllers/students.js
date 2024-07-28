import createHttpError from 'http-errors';
import { getAllStudents, getStudentById } from '../services/students.js';

export const getStudentsController = async (req, res, next) => {
	const students = await getAllStudents();

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
