// import axios from 'axios';
import * as cheerio from 'cheerio';

import * as fs from 'fs';
import { extractAuthorAndPlace, extractInfoFromName, extractPredecessors, extractYearOfCreation } from '../utils/scraper';

// const PAGE_URL = 'https://en.wikipedia.org/wiki/Timeline_of_programming_languages';

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

      const language = {
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

const scraper = async () => {
  // const response = await axios.get(PAGE_URL);
  // const languages = retrieveData(response.data);

  const data = fs.readFileSync(`${__dirname}/page.txt`, { encoding: 'utf-8' });

  const languages = retrieveData(data);

  // console.log(languages);

  fs.writeFileSync(`${__dirname}/page.json`, JSON.stringify(languages, null, 2));

  /*await connectToDatabase();

  const insertPromises = languages.map(async (language) => {
    return languageService.create(language);
  });

  await Promise.all(insertPromises);*/

  // console.log('Data inserted successfully!');
};

(async () => {
  await scraper();
})();
