import path from 'node:path';

export const SORT_ORDER = {
	ASC: 'asc',
	DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ROLES = {
	TEACHER: 'teacher',
	PARENT: 'parent',
};

export const SMTP = {
	SMTP_HOST: 'SMTP_HOST',
	SMTP_PORT: 'SMTP_PORT',
	SMTP_USER: 'SMTP_USER',
	SMTP_PASSWORD: 'SMTP_PASSWORD',
	SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMPLATE_FILE_NAME = 'reset-password-email.html';
