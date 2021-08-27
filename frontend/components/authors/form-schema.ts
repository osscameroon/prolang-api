import * as yup from 'yup';

import { FORM_ERRORS } from '@utils/constants';

export const authorFormSchema = yup.object().shape({
  birthDate: yup.date().nullable(),
  country: yup.string().nullable(),
  link: yup.string().nullable(),
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(2, FORM_ERRORS.minCharacters(2))
    .max(100, FORM_ERRORS.maxCharacters(100)),
  picture: yup.string().nullable(),
});

export type AuthorFormValues = yup.InferType<typeof authorFormSchema>;

export type UpdateAuthorFormValues = {
  birthDate?: Date | null;
  country?: string | null;
  link?: string | null;
  name: string;
  picture?: string | null;
};
