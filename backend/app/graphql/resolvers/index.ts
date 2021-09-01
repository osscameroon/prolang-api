import { ApolloError } from 'apollo-server-express';

import authorService from '../../domain/services/author.service';
import languageService from '../../domain/services/language.service';
import yearGroupService from '../../domain/services/yearGroup.service';
import { dateScalar } from '../scalars/date';
import { allYearGroups } from './queries/allYearGroups';
import { oneYearGroup } from './queries/oneYearGroup';
import { allAuthors } from './queries/allAuthors';
import { authors } from './queries/authors';
import { oneAuthor } from './queries/oneAuthor';
import { allLanguages } from './queries/allLanguages';
import { languages } from './queries/languages';
import { oneLanguage } from './queries/oneLanguage';
import { Resolvers } from '../types/types';
import { RECORD_NOT_FOUND_CODE, RECORD_NOT_FOUND_MESSAGE } from '../../shared/utils/constants';

const resolvers: Resolvers = {
  Author: {
    id: (author) => author._id,
    languages: (author) => {
      return languageService.findByAuthor(author._id);
    },
  },
  Date: dateScalar,
  Language: {
    authors: (language) => {
      return authorService.findByIds(language.authors);
    },
    id: (language) => language._id,
    predecessors: (language) => {
      return languageService.findByIds(language.predecessors);
    },
    successors: (language) => {
      return languageService.findSuccessors(language._id);
    },
    yearGroup: async (language) => {
      const yearGroup = await yearGroupService.findById(language.yearGroup);

      if (!yearGroup) {
        throw new ApolloError(RECORD_NOT_FOUND_MESSAGE('Language', language.yearGroup), RECORD_NOT_FOUND_CODE);
      }

      return yearGroup;
    },
  },
  Query: {
    allAuthors,
    allLanguages,
    allYearGroups,
    authors,
    languages,
    oneAuthor,
    oneLanguage,
    oneYearGroup,
  },
  YearGroup: {
    id: (yearGroup) => yearGroup._id,
  },
};

export { resolvers };
