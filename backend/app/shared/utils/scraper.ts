import * as cheerio from 'cheerio';

import { LanguageInfo, AuthorInfo } from '../types/scraper';
import { WIKIPEDIA_URL } from './constants';

const appendLink = (link: string | undefined) => {
  if (!link) {
    return null;
  }

  if (link.indexOf('redlink=1') >= 0) {
    return null;
  }

  return `${WIKIPEDIA_URL}${link}`;
};

const removeParenthesis = (text: string) => {
  return text.replace('(', '').replace(')', '');
};

const removeParenthesisFromExtra = (nameExtra: LanguageInfo['nameExtra']) => {
  if (!nameExtra) {
    return nameExtra;
  }

  if (typeof nameExtra === 'string') {
    return removeParenthesis(nameExtra);
  }

  return {
    ...nameExtra,
    name: removeParenthesis(nameExtra.name),
  };
};

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
  const nameExtraExcept = nameExtra.indexOf('page does not exist') < 0 ? nameExtra : null;

  return [name.replace(nameExtra, '').trim(), nameExtraExcept];
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
    return {
      link: appendLink(aTag.attr('href')),
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
    return { link: null, name: '', nameExtra: null };
  }

  const $ = cheerio.load(content);
  const aTag = $('a').first();

  const link = aTag.attr('href');
  const [name, nameExtra] = extractName(aTag.text());

  const nameExtraFallback = extractNameExtra(content, nameExtra);

  return {
    link: appendLink(link),
    name,
    nameExtra: removeParenthesisFromExtra(handleSQLExtra(content, name, nameExtraFallback)),
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

const extractPredecessors = (content: string): LanguageInfo[] => {
  if (!content || content.startsWith('none')) {
    return [];
  }

  if (content.startsWith('Operator programming')) {
    return [
      {
        link: null,
        name: 'Operator programming',
        nameExtra: null,
      },
    ];
  }

  return content.split(',').map((text) => {
    const $ = cheerio.load(text.replace(/<sup.*>.*<\/sup>/, ''));
    const aTag = $('a');
    const hasTag = aTag.length > 0;

    return {
      link: hasTag ? appendLink(aTag.attr('href')) : null,
      name: hasTag ? aTag.text().trim() : text.trim(),
      nameExtra: null,
    };
  });
};

const extractAuthorAndPlace = (content: string): AuthorInfo[] => {
  if (!content) {
    return [];
  }

  return content
    .split(', ')
    .map((text) => {
      const authors = text.split(text.indexOf(' and ') >= 0 ? ' and ' : ', ');

      return authors.map((author) => {
        const $ = cheerio.load(author.replace(/<sup.*>.*<\/sup>/, ''));
        const aTag = $('a');
        const hasTag = aTag.length > 0;

        return {
          link: hasTag ? appendLink(aTag.attr('href')) : null,
          name: hasTag ? aTag.text().trim() : author.trim(),
        };
      });
    })
    .flat();
};

export { extractInfoFromName, extractYearOfCreation, extractPredecessors, extractAuthorAndPlace };
