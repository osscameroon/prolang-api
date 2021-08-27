import { SelectOption, UserRoleEnum } from '@typings/common';

export const FORM_ERRORS = {
  emailInvalid: 'The email address is invalid.',
  endTimeError: 'The end time must be greater than the start time',
  fieldRequired: 'This field is required.',
  maxCharacters: (numChar: number) => `Must be at most ${numChar} characters`,
  minCharacters: (numChar: number) => `Must be at least ${numChar} characters`,
  passwordNotMatch: 'The confirm password doesn\'t match the password',
};

export const COOKIE_NAME = 'prlusrtkn';

export const BAD_LOGIN_MESSAGE = 'The credential is invalid.';
export const NETWORK_ERROR_MESSAGE = 'Failed to processed the request.';

export const USER_DELETED_MESSAGE = 'The user deleted successfully.';
export const USER_UPDATED_MESSAGE = 'The user updated successfully.';
export const USER_CREATED_MESSAGE = 'The author created successfully.';

export const AUTHOR_DELETED_MESSAGE = 'The author deleted successfully.';
export const AUTHOR_UPDATED_MESSAGE = 'The author updated successfully.';
export const AUTHOR_CREATED_MESSAGE = 'The author created successfully.';

export const LANGUAGE_DELETED_MESSAGE = 'The language deleted successfully.';
export const LANGUAGE_UPDATED_MESSAGE = 'The language updated successfully.';
export const LANGUAGE_CREATED_MESSAGE = 'The language created successfully.';

export const QUERY_KEYS = {
  dashboardSummary: 'dashboardSummary',
  getAuthenticated: 'getAuthenticated',
  getAuthor: 'getAuthor',
  getAuthors: 'getAuthors',
  getLanguage: 'getLanguage',
  getLanguages: 'getLanguages',
  getUser: 'getUser',
  getUsers: 'getUsers',
  getYearGroups: 'getYearGroups',
};

export const YEAR_CONFIRMED_OPTION: SelectOption[] = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

export const USER_ROLE_OPTION: SelectOption[] = [
  { label: 'User', value: UserRoleEnum.USER },
  { label: 'Admin', value: UserRoleEnum.ADMIN },
];

export const DEFAULT_YEAR_GROUP = { label: 'All', value: '' };
