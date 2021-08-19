import { extractInfoFromName } from '../../../app/shared/utils/scraper';
import { WIKIPEDIA_URL } from '../../../app/shared/utils/constants';
import { LanguageInfo } from '../../../app/shared/types/scraper';

describe('Test extractInfoFromName', () => {
  test('Empty content', () => {
    expect(extractInfoFromName('')).toMatchObject({
      name: '',
      nameExtra: null,
      link: null,
    });
  });

  test('Content with link and name only', () => {
    const content = '<a href="/wiki/Fortran#Fortran_2018" title="Fortran">Fortran 2018</a>';

    expect(extractInfoFromName(content)).toMatchObject({
      name: 'Fortran 2018',
      nameExtra: null,
      link: `${WIKIPEDIA_URL}/wiki/Fortran#Fortran_2018`,
    });
  });

  test('Content with link, name and nameExtra', () => {
    const content =
      '<a href="/wiki/Swift_(parallel_scripting_language)" title="Swift (parallel scripting language)">Swift (parallel scripting language)</a>';

    expect(extractInfoFromName(content)).toMatchObject({
      name: 'Swift',
      nameExtra: '(parallel scripting language)',
      link: `${WIKIPEDIA_URL}/wiki/Swift_(parallel_scripting_language)`,
    });
  });

  test('Content with link, name and nameExtra - Edge case 1', () => {
    const content = '<a href="/wiki/GDScript" class="mw-redirect" title="GDScript">GDScript</a> (GDS)';

    expect(extractInfoFromName(content)).toMatchObject({
      name: 'GDScript',
      nameExtra: '(GDS)',
      link: `${WIKIPEDIA_URL}/wiki/GDScript`,
    });
  });

  test('Content with link, name and nameExtra - Edge case 2', () => {
    const content =
      '<a href="/wiki/XSL_Transformations" class="mw-redirect" title="XSL Transformations">XSLT</a> (+ <a href="/wiki/XPath" title="XPath">XPath</a>)';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      name: 'XSLT',
      nameExtra: {
        name: 'XPath',
        link: `${WIKIPEDIA_URL}/wiki/XPath`,
      },
      link: `${WIKIPEDIA_URL}/wiki/XSL_Transformations`,
    });
  });

  test('Content with link, name and nameExtra - Edge case 3', () => {
    const content =
      '<a href="/wiki/Mathematica" class="mw-redirect" title="Mathematica">Mathematica</a> (<a href="/wiki/Wolfram_Language" title="Wolfram Language">Wolfram Language</a>)';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      name: 'Mathematica',
      nameExtra: {
        name: 'Wolfram Language',
        link: `${WIKIPEDIA_URL}/wiki/Wolfram_Language`,
      },
      link: `${WIKIPEDIA_URL}/wiki/Mathematica`,
    });
  });

  test('Content with link, name and nameExtra - Edge case 4', () => {
    const content = '<a href="/wiki/PROSE_modeling_language" title="PROSE modeling language">PROSE modeling language</a> Time-Sharing Version';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      name: 'PROSE modeling language',
      nameExtra: 'Time-Sharing Version',
      link: `${WIKIPEDIA_URL}/wiki/PROSE_modeling_language`,
    });
  });

  test('Content with link, name and nameExtra - Edge case 5', () => {
    const content = 'Structured Query language (<a href="/wiki/SQL" title="SQL">SQL</a>)';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      name: 'SQL',
      nameExtra: 'Structured Query language',
      link: `${WIKIPEDIA_URL}/wiki/SQL`,
    });
  });
});
