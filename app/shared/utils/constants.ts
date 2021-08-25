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
export const RECORD_NOT_FOUND_MESSAGE = (model: string, id: string) => {
  return `No ${model} found with id: ${id}`;
};
