import axios from 'axios';
import * as cheerio from 'cheerio';

import {
  extractAuthorAndPlace,
  extractInfoFromName,
  extractPredecessors,
  extractYearOfCreation,
} from '../utils/scraper';
import { PROGRAMMING_PAGE_URL, YEAR_GROUP_NOT_CREATED_MESSAGE } from '../utils/constants';
import { LanguageInfo, ScraperResult } from '../types/scraper';
import { AuthorDocument, LanguageDocument, YearGroupDocument } from '../types/models';
import { connectToDatabase } from './database';
import { logger } from './logger';
import languageService from '../../domain/services/language.service';
import authorService from '../../domain/services/author.service';
import yearGroupService from '../../domain/services/yearGroup.service';

const retrieveData = (content: string) => {
  const $ = cheerio.load(content);

  const headers = $('body h2');

  const languages = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers.eq(i);
    const table = header.next('table');

    if (!table.is('table')) {
      continue;
    }

    const yearGroup = header.children('span').first().text();
    const tableRows = table.children('tbody').children('tr');

    for (let i = 0; i < tableRows.length; i++) {
      const rowColumns = tableRows.eq(i).children('td');

      const nameInfo = extractInfoFromName(rowColumns.eq(1).html()?.replace('\n', '') || '');

      if (!nameInfo.name) {
        continue;
      }

      const language: ScraperResult = {
        ...nameInfo,
        authors: extractAuthorAndPlace(rowColumns.eq(2).html()?.replace('\n', '') || ''),
        place: null,
        predecessors: extractPredecessors(rowColumns.eq(3).html()?.replace('\n', '') || ''),
        yearConfirmed: !rowColumns.eq(0).text().endsWith('?'),
        yearGroup,
        years: extractYearOfCreation(rowColumns.eq(0).text().replace('\n', '')),
      };

      languages.push(language);
    }
  }

  return languages;
};

const selectPredecessors = async (input: LanguageInfo[]) => {
  const promises = input.map(async (languageInfo) => {
    const language = await languageService.findByName(languageInfo.name);

    if (!language) {
      const { link, name, nameExtra } = languageInfo;
      const nameExtraInput = typeof nameExtra == 'string' ? { link: null, name: nameExtra } : nameExtra;
      const notListedGroup: YearGroupDocument | null = await yearGroupService.findNotListedGroup();

      if (!notListedGroup) {
        throw new Error(YEAR_GROUP_NOT_CREATED_MESSAGE);
      }

      return languageService.findOrCreate({
        authors: [],
        company: null,
        link,
        listed: false,
        name,
        nameExtra: nameExtraInput,
        predecessors: [],
        yearConfirmed: false,
        yearGroup: notListedGroup._id,
        years: [],
      });
    }

    return language;
  });

  const result: LanguageDocument[] = await Promise.all(promises);

  return result.map((language) => language._id);
};

const createLanguage: (language: ScraperResult) => Promise<LanguageDocument> = async (language: ScraperResult) => {
  const yearGroupDoc = await yearGroupService.findOrCreate({ name: language.yearGroup });

  const authorsCreated: AuthorDocument[] = [];

  for (const author of language.authors) {
    authorsCreated.push(
      await authorService.findOrCreate({
        birthDate: null,
        country: null,
        link: author.link,
        name: author.name,
        picture: null,
      }),
    );
  }

  const authorIds = authorsCreated.filter((author) => Boolean(author)).map((author) => author._id);

  const { authors, nameExtra, predecessors, yearGroup, ...languageInput } = language;

  const nameExtraInput = typeof nameExtra == 'string' ? { link: null, name: nameExtra } : nameExtra;

  return languageService.findOrCreate({
    authors: authorIds,
    company: null,
    link: languageInput.link,
    listed: true,
    name: languageInput.name,
    nameExtra: nameExtraInput,
    predecessors: await selectPredecessors(predecessors),
    yearConfirmed: languageInput.yearConfirmed,
    yearGroup: yearGroupDoc._id,
    years: languageInput.years,
  });
};

const scrapeAndSeedDatabase = async () => {
  const response = await axios.get(PROGRAMMING_PAGE_URL);
  const languages = retrieveData(response.data);

  await connectToDatabase();

  await yearGroupService.createNotListedGroup();

  for (const language of languages) {
    await createLanguage(language);
  }

  logger.info('Data inserted successfully!');
};

(async () => {
  await scrapeAndSeedDatabase();
})();
