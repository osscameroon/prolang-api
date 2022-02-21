import {
  extractQueryFields,
  generateRoutePrefix,
  isScamRoute,
  removeQueryStringIfExist,
} from '../../../shared/utils/helpers';

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

describe.only('Others helpers functions', () => {
  test('remove query string from the URL path', () => {
    expect(removeQueryStringIfExist('/languages?fields=id,name')).toMatchInlineSnapshot(`"/languages"`);
    expect(removeQueryStringIfExist('/years-groups')).toMatchInlineSnapshot(`"/years-groups"`);
    expect(removeQueryStringIfExist('/authors/all?search=ban&page=3')).toMatchInlineSnapshot(`"/authors/all"`);
  });

  test('Generate route prefix with path specified', () => {
    expect(generateRoutePrefix('users')).toMatchObject(['/users', '/private/users']);
  });

  test('Generate route prefix with no path', () => {
    expect(generateRoutePrefix('/')).toMatchObject(['/', '/private']);
  });

  test.only('Verify if the url is from scam', () => {
    expect(isScamRoute('/languages?fields=id,name')).toEqual(false);
    expect(isScamRoute('/?XDEBUG_SESSION_START=phpstorm')).toEqual(true);
    expect(isScamRoute('/years-groups')).toEqual(false);
    expect(isScamRoute('/authors/all?search=ban&page=3')).toEqual(false);
    expect(isScamRoute('/?rest_route=/wp/v2/users')).toEqual(true);
    expect(isScamRoute('/?q=%peddled%&va=b&t=hc&ia=web')).toEqual(true);
    expect(isScamRoute('/?=PHPB8B5F2A0-3C92-11d3-A3A9-4C7B08C10000')).toEqual(true);
  });
});
