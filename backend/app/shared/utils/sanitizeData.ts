import mongoose from 'mongoose';

import { connectToDatabase } from '../core/database';
import { DATABASE_URL } from '../core/config';
import languageService from '../../domain/services/language.service';
import authorService from '../../domain/services/author.service';
import { AuthorDocument, LanguageDocument } from '../types/models';

const findDanglingAuthorsIdInLanguages = async () => {
  console.log('\nFind languages with dangling authors id');

  const languages: LanguageDocument[] = await languageService.findAll();

  const promises = languages.map(async (language) => {
    const authorPromises = language.authors.map(async (author) => {
      const authorItem = await authorService.findById(author);

      if (!authorItem) {
        console.log(language._id, ' ====> ', author);
      }
    });

    return Promise.all(authorPromises);
  });

  await Promise.all(promises);
};

const findAuthorsWithNoLanguage = async () => {
  console.log('\nFind author with no language');
  const authors: AuthorDocument[] = await authorService.findAll();

  const promises = authors.map(async (author) => {
    const languages: LanguageDocument[] = await languageService.findByAuthor(author._id);

    if (languages.length === 0) {
      console.log('Author ====> ', author._id, author.name);
    }
  });

  await Promise.all(promises);
};

(async () => {
  await connectToDatabase(DATABASE_URL);

  await findDanglingAuthorsIdInLanguages();

  await findAuthorsWithNoLanguage();

  await mongoose.connection.close();

  process.exit();
})();
