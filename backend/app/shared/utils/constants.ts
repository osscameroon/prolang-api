export const YEAR_GROUP_NOT_CREATED_MESSAGE = 'Year group for not listed language is not created!';
export const WIKIPEDIA_URL = 'https://en.wikipedia.org';
export const YEAR_GROUP_NOT_LISTED = 'Not Listed';
export const PROGRAMMING_PAGE_URL = 'https://en.wikipedia.org/wiki/Timeline_of_programming_languages';
export const PATH_NOT_FOUND = 'Path not found';
export const RECORD_NOT_FOUND_CODE = 'RECORD_NOT_FOUND';
export const INVALID_DATE_TYPE_CODE = 'INVALID_TYPE';
export const INVALID_DATE_TYPE_MESSAGE = 'The date format must be YYYY-MM-DD';
export const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
export const TOO_MANY_REQUESTS_MESSAGE = 'Too Many Requests';
export const INTERNAL_SERVER_ERROR = 'Internal server error';
export const USER_ALREADY_EXISTS = 'User already exists!';
export const LOGIN_FAILED = 'Login failed: Invalid credentials';
export const NOT_AUTHENTICATED = 'Access to this resource requires authentication';
export const ADMIN_PASSWORD_NOT_SET = 'The admin password not set.';
export const RESOURCE_NOT_FOUND = 'The resource not found.';

export const PUBLIC_ROUTE_PREFIX = '/api';
export const PRIVATE_ROUTE_PREFIX = '/private';

export const RECORD_NOT_FOUND_MESSAGE = (model: string, id: string) => {
  return `No ${model} found with id: ${id}`;
};
export const RECORD_DELETED_MESSAGE = (model: string) => {
  return `The ${model} deleted successfully!`;
};
