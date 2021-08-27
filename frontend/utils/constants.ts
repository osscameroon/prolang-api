export const FORM_ERRORS = {
  emailInvalid: 'The email address is invalid.',
  endTimeError: 'The end time must be greater than the start time',
  fieldRequired: 'This field is required.',
  maxCharacters: (numChar: number) => `Must be at most ${numChar} characters`,
  maxNumbers: (numChar: number) => `Must be lower than ${numChar} characters`,
  minCharacters: (numChar: number) => `Must be at least ${numChar} characters`,
  minNumbers: (numChar: number) => `Must be greater than ${numChar}.`,
};

export const COOKIE_NAME = 'prlusrtkn';

export const BAD_LOGIN_MESSAGE = 'The credential is invalid.';
export const NETWORK_ERROR_MESSAGE = 'Failed to processed the request.';

export const AUTHOR_DELETED_MESSAGE = 'The author deleted successfully.';
export const LANGUAGE_DELETED_MESSAGE = 'The language deleted successfully.';
export const USER_DELETED_MESSAGE = 'The user deleted successfully.';
export const AUTHOR_UPDATED_MESSAGE = 'The author updated successfully.';
export const AUTHOR_CREATED_MESSAGE = 'The author created successfully.';

export const QUERY_KEYS = {
  dashboardSummary: 'dashboardSummary',
  getAuthors: 'getAuthors',
  getAuthor: 'getAuthor',
  getLanguages: 'getLanguages',
  getUser: 'getUser',
  getUsers: 'getUsers',
  getYearGroups: 'getYearGroups',
};
