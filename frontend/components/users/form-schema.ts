import * as yup from 'yup';

import { SelectOption } from '@typings/common';
import { FORM_ERRORS } from '@utils/constants';

export const userFormSchema = yup.object().shape({
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], FORM_ERRORS.passwordNotMatch),
  email: yup.string().required(FORM_ERRORS.fieldRequired).email(FORM_ERRORS.emailInvalid),
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(2, FORM_ERRORS.minCharacters(2))
    .max(100, FORM_ERRORS.maxCharacters(100)),
  password: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(6, FORM_ERRORS.minCharacters(6))
    .max(30, FORM_ERRORS.maxCharacters(30)),
});

export type UserFormValues = yup.InferType<typeof userFormSchema> & {
  role: SelectOption;
};

export type UpdateUserFormValues = {
  confirmPassword?: string;
  email?: string;
  name?: string;
  password?: string;
  role?: SelectOption;
};
