import * as yup from 'yup';

import { SelectOption } from '@typings/common';
import { FORM_ERRORS } from '@utils/constants';

export const languageFormSchema = yup.object().shape({
  company: yup.string().nullable(),
  extraLink: yup.string().nullable(),
  extraName: yup.string().nullable(),
  link: yup.string().nullable(),
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(2, FORM_ERRORS.minCharacters(2))
    .max(100, FORM_ERRORS.maxCharacters(100)),
  yearConfirmed: yup.object().required(),
  yearGroup: yup.object().required(),
  years: yup.string().nullable(),
});

export type LanguageFormValues = yup.InferType<typeof languageFormSchema> & {
  yearConfirmed: SelectOption;
  years: SelectOption;
};

export type UpdateLanguageFormValues = {
  company?: string;
  extraLink?: string;
  extraName?: string;
  link?: string;
  name: string;
  yearConfirmed?: SelectOption;
  yearGroup: SelectOption;
  years?: string;
};
