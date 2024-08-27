import Joi from 'joi';

export const registerUserSchema = Joi.object({
	name: Joi.string().min(3).max(30).required().messages({
		'string.base': 'Must be a string',
		'any.required': '{{#label}} is required',
		'string.min': 'Min string length is not achieved, {{#limit}} requires',
		'string.max': 'Man string length is not achieved, {{#limit}} requires',
	}),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export const loginUserSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
	email: Joi.string()
		.email()
		.required()
		.messages({ 'string.base': 'Must be a string' }),
});

export const resetPasswordSchema = Joi.object({
	token: Joi.string().required(),
	password: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
	code: Joi.string().required(),
});
