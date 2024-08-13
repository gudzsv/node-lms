import Joi from 'joi';

export const createStudentSchema = Joi.object({
	name: Joi.string().min(3).max(30).required().messages({
		'any.required': '{{#label}} is required',
		'string.min': 'Min string length is not achieved, {{#limit}} requires',
		'string.max': 'Man string length is not achieved, {{#limit}} requires',
	}),
	email: Joi.string().email().required(),
	age: Joi.number().integer().min(6).max(16).required(),
	gender: Joi.string().valid('male', 'female', 'other').required(),
	avgMark: Joi.number().min(2).max(12).required().messages({
		'number.base': 'Must be a number',
		'number.min': 'Min number length is not achieved, {{#limit}} requires',
		'number.max': 'Man number length is not achieved, {{#limit}} requires',
	}),
	onDuty: Joi.boolean(),
	parentId: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
	name: Joi.string().min(3).max(30),
	email: Joi.string().email(),
	age: Joi.number().integer().min(6).max(16),
	gender: Joi.string().valid('male', 'female', 'other'),
	avgMark: Joi.number().min(2).max(12),
	onDuty: Joi.boolean(),
});
