import * as yup from 'yup';

import { SelectOption } from '@typings/common';
import { FORM_ERRORS } from '@utils/constants';

export const languageFormSchema = yup.object().shape({
  authors: yup.array().required(),
  company: yup.string().nullable(),
  extraLink: yup.string().nullable(),
  extraName: yup.string().nullable(),
  link: yup.string().nullable(),
  longName: yup.string().nullable(),
  name: yup
    .string()
    .required(FORM_ERRORS.fieldRequired)
    .min(1, FORM_ERRORS.minCharacters(1))
    .max(100, FORM_ERRORS.maxCharacters(100)),
  predecessors: yup.array().required(),
  yearConfirmed: yup.object().required(),
  yearGroup: yup.object().required(),
  years: yup.string().nullable(),
});

export type LanguageFormValues = yup.InferType<typeof languageFormSchema> & {
  yearConfirmed: SelectOption;
  years: SelectOption;
  authors: SelectOption[];
  predecessors: SelectOption[];
};

export type UpdateLanguageFormValues = {
  authors: SelectOption[];
  company?: string;
  extraLink?: string;
  extraName?: string;
  predecessors: SelectOption[];
  link?: string;
  longName?: string;
  name: string;
  yearConfirmed?: SelectOption;
  yearGroup: SelectOption;
  years?: string;
};
