import * as cheerio from 'cheerio';

import { LanguageInfo } from '../types/scraper';
import { WIKIPEDIA_URL } from './constants';

const extractName = (name: string): [name: string, nameExtra: string | null] => {
  const parenthesisMathPosition = name.search(/\(.*\)/);

  if (parenthesisMathPosition < 0) {
    const noParenthesisMathPosition = name.search(/<\/a>.*/);

    if (noParenthesisMathPosition >= 0) {
      const nameExtra = name.substr(noParenthesisMathPosition).replace('</a>', '').trim();

      return [name, nameExtra];
    }

    return [name, null];
  }

  const nameExtra = name.substr(parenthesisMathPosition);

  return [name.replace(nameExtra, '').trim(), nameExtra];
};

const extractNameExtra = (content: string, nameExtra: string | null) => {
  if (nameExtra) {
    return nameExtra;
  }

  const [, result] = extractName(content);

  if (!result) {
    return null;
  }

  const $ = cheerio.load(result);
  const aTag = $('a').first();

  if (aTag.length > 0) {
    const link = aTag.attr('href');

    return {
      link: link ? `${WIKIPEDIA_URL}${link}` : null,
      name: aTag.text(),
    };
  }

  return result;
};

const handleSQLExtra = (content: string, name: string, nameExtra: LanguageInfo['nameExtra']) => {
  if (name !== 'SQL') {
    return nameExtra;
  }

  const position = content.search(/\(<a.*/);

  return content.substr(0, position).trim();
};

const extractInfoFromName = (content: string): LanguageInfo => {
  if (!content) {
    return { name: '', nameExtra: null, link: null };
  }

  const $ = cheerio.load(content);
  const aTag = $('a').first();

  const link = aTag.attr('href');
  const [name, nameExtra] = extractName(aTag.text());

  const nameExtraFallback = extractNameExtra(content, nameExtra);

  return {
    name,
    nameExtra: handleSQLExtra(content, name, nameExtraFallback),
    link: link ? `${WIKIPEDIA_URL}${link}` : null,
  };
};

const extractYearOfCreation = (content: string): number[] => {
  if (!content) {
    return [];
  }

  const [yearStart, yearEnd] = content.split('–');

  if (!yearEnd) {
    return [+yearStart.substr(0, 4)];
  }

  return [+yearStart, +(yearEnd.length < 4 ? `${yearStart.substr(0, 2)}${yearEnd}` : yearEnd)];
};

export { extractInfoFromName, extractYearOfCreation };
