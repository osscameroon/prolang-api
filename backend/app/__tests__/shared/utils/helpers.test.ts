import { extractQueryFields, removeQueryStringIfExist } from '../../../shared/utils/helpers';

describe('Test Helpers - extractQueryFields', () => {
  test('No fields passed as argument', () => {
    const query = {};

    expect(extractQueryFields(query)).toMatchObject({
      fields: undefined,
      keyword: undefined,
      page: 1,
    });
  });

  test('fields and keyword parameters provided', () => {
    const query = {
      fields: 'name,picture,link',
      page: undefined,
      search: 'java',
    };

    expect(extractQueryFields(query)).toMatchObject({
      fields: 'name picture link',
      keyword: 'java',
      page: 1,
    });
  });

  test('all parameters provided', () => {
    const query = {
      fields: 'name,picture, link',
      page: '5',
      search: 'C++',
    };

    expect(extractQueryFields(query)).toMatchObject({
      fields: 'name picture link',
      keyword: 'C++',
      page: 5,
    });
  });
});

describe('Others helpers functions', () => {
  test('remove query string fron the URL path', () => {
    expect(removeQueryStringIfExist('/api/languages?fields=id,name')).toMatchInlineSnapshot(`"/api/languages"`);
    expect(removeQueryStringIfExist('/years-groups')).toMatchInlineSnapshot(`"/years-groups"`);
    expect(removeQueryStringIfExist('/authors/all?search=ban&page=3')).toMatchInlineSnapshot(`"/authors/all"`);
  });
});
