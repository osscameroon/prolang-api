// import axios from 'axios';
import * as cheerio from 'cheerio';

import * as fs from 'fs';

// const PAGE_URL = 'https://en.wikipedia.org/wiki/Timeline_of_programming_languages';

type ProgrammingLanguage = {
  yearCategory: string;
  year: number[];
  yearConfirmed: boolean;
  name: string;
  author: string;
  predecessors: string[];
};

const parseYear = (input: string) => {
  const array = input.split('–');

  if (array.length < 2) {
    return [+input.substr(0, 4)];
  }
  return [+array[0], +(array[1].length < 4 ? `${array[0].substr(0, 2)}${array[1]}` : array[1])];
};

const retrieveData = (content: string) => {
  const $ = cheerio.load(content);

  const headers = $('body h2');

  const languages: ProgrammingLanguage[] = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers.eq(i);
    const table = header.next('table');

    if (!table.is('table')) {
      continue;
    }

    const yearCategory = header.children('span').first().text();
    const tableRows = table.children('tbody').children('tr');

    for (let i = 0; i < tableRows.length; i++) {
      const rowColumns = tableRows.eq(i).children('td');
      const name = rowColumns.eq(1).text().replace('\n', '');

      if (!name) {
        continue;
      }

      //if (i === 0) {
      console.log(rowColumns.eq(0).text(), rowColumns.eq(2).html());
      //}

      const language: ProgrammingLanguage = {
        author: rowColumns.eq(2).text().replace('\n', ''),
        name,
        predecessors: rowColumns
          .eq(3)
          .text()
          .split(',')
          .map((value) => value.trim()),
        year: parseYear(rowColumns.eq(0).text()),
        yearConfirmed: !rowColumns.eq(0).text().endsWith('?'),
        yearCategory,
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

  console.log(languages.length);

  console.log(languages[0]);

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
