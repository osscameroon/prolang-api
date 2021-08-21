import axios from 'axios';
import * as cheerio from 'cheerio';

import { extractAuthorAndPlace, extractInfoFromName, extractPredecessors, extractYearOfCreation } from '../utils/scraper';
import { PROGRAMMING_PAGE_URL, YEAR_GROUP_NOT_CREATED_MESSAGE } from '../utils/constants';
import { LanguageInfo, ScraperResult } from '../types/scraper';
import { AuthorDocument, LanguageDocument, YearGroupDocument } from '../types/models';
import { connectToDatabase } from './database';
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
        years: extractYearOfCreation(rowColumns.eq(0).text().replace('\n', '')),
        yearConfirmed: !rowColumns.eq(0).text().endsWith('?'),
        yearGroup,
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
      const nameExtraInput = typeof nameExtra == 'string' ? { name: nameExtra, link: null } : nameExtra;
      const notListedGroup: YearGroupDocument | null = await yearGroupService.findNotListedGroup();

      if (!notListedGroup) {
        throw new Error(YEAR_GROUP_NOT_CREATED_MESSAGE);
      }

      return languageService.findOrCreate({
        link,
        name,
        nameExtra: nameExtraInput,
        years: [],
        predecessors: [],
        yearGroup: notListedGroup._id,
        yearConfirmed: false,
        company: null,
        authors: [],
        listed: false,
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
        name: author.name,
        link: author.link,
        birthDate: null,
        country: null,
        picture: null,
      }),
    );
  }

  const authorIds = authorsCreated.filter((author) => Boolean(author)).map((author) => author._id);

  const { authors, nameExtra, predecessors, yearGroup, ...languageInput } = language;

  const nameExtraInput = typeof nameExtra == 'string' ? { name: nameExtra, link: null } : nameExtra;

  return languageService.findOrCreate({
    name: languageInput.name,
    link: languageInput.link,
    years: languageInput.years,
    yearConfirmed: languageInput.yearConfirmed,
    nameExtra: nameExtraInput,
    company: null,
    authors: authorIds,
    yearGroup: yearGroupDoc._id,
    predecessors: await selectPredecessors(predecessors),
    listed: true,
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

  console.log('Data inserted successfully!');
};

(async () => {
  await scrapeAndSeedDatabase();
})();
