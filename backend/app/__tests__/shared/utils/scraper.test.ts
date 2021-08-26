import {
  extractAuthorAndPlace,
  extractInfoFromName,
  extractPredecessors,
  extractYearOfCreation,
} from '../../../shared/utils/scraper';
import { WIKIPEDIA_URL } from '../../../shared/utils/constants';
import { LanguageInfo } from '../../../shared/types/scraper';

describe("Test Extract language's name", () => {
  test('Empty content', () => {
    expect(extractInfoFromName('')).toMatchObject({
      link: null,
      name: '',
      nameExtra: null,
    });
  });

  test('Content with link and name only', () => {
    const content = '<a href="/wiki/Fortran#Fortran_2018" title="Fortran">Fortran 2018</a>';

    expect(extractInfoFromName(content)).toMatchObject({
      link: `${WIKIPEDIA_URL}/wiki/Fortran#Fortran_2018`,
      name: 'Fortran 2018',
      nameExtra: null,
    });
  });

  test('Content with link and name only', () => {
    const content =
      '<a href="/w/index.php?title=ENIAC_Short_Code&amp;action=edit&amp;redlink=1" class="new" title="ENIAC Short Code (page does not exist)">ENIAC Short Code</a>';

    expect(extractInfoFromName(content)).toMatchObject({
      link: null,
      name: 'ENIAC Short Code',
      nameExtra: null,
    });
  });

  test('Content with link, name and nameExtra', () => {
    const content =
      '<a href="/wiki/Swift_(parallel_scripting_language)" title="Swift (parallel scripting language)">Swift (parallel scripting language)</a>';

    expect(extractInfoFromName(content)).toMatchObject({
      link: `${WIKIPEDIA_URL}/wiki/Swift_(parallel_scripting_language)`,
      name: 'Swift',
      nameExtra: 'parallel scripting language',
    });
  });

  test('Content with link, name and nameExtra - Edge case 1', () => {
    const content = '<a href="/wiki/GDScript" class="mw-redirect" title="GDScript">GDScript</a> (GDS)';

    expect(extractInfoFromName(content)).toMatchObject({
      link: `${WIKIPEDIA_URL}/wiki/GDScript`,
      name: 'GDScript',
      nameExtra: 'GDS',
    });
  });

  test('Content with link, name and nameExtra - Edge case 2', () => {
    const content =
      '<a href="/wiki/XSL_Transformations" class="mw-redirect" title="XSL Transformations">XSLT</a> (+ <a href="/wiki/XPath" title="XPath">XPath</a>)';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      link: `${WIKIPEDIA_URL}/wiki/XSL_Transformations`,
      name: 'XSLT',
      nameExtra: {
        link: `${WIKIPEDIA_URL}/wiki/XPath`,
        name: 'XPath',
      },
    });
  });

  test('Content with link, name and nameExtra - Edge case 3', () => {
    const content =
      '<a href="/wiki/Mathematica" class="mw-redirect" title="Mathematica">Mathematica</a> (<a href="/wiki/Wolfram_Language" title="Wolfram Language">Wolfram Language</a>)';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      link: `${WIKIPEDIA_URL}/wiki/Mathematica`,
      name: 'Mathematica',
      nameExtra: {
        link: `${WIKIPEDIA_URL}/wiki/Wolfram_Language`,
        name: 'Wolfram Language',
      },
    });
  });

  test('Content with link, name and nameExtra - Edge case 4', () => {
    const content =
      '<a href="/wiki/PROSE_modeling_language" title="PROSE modeling language">PROSE modeling language</a> Time-Sharing Version';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      link: `${WIKIPEDIA_URL}/wiki/PROSE_modeling_language`,
      name: 'PROSE modeling language',
      nameExtra: 'Time-Sharing Version',
    });
  });

  test('Content with link, name and nameExtra - Edge case 5', () => {
    const content = 'Structured Query language (<a href="/wiki/SQL" title="SQL">SQL</a>)';

    expect(extractInfoFromName(content)).toMatchObject<LanguageInfo>({
      link: `${WIKIPEDIA_URL}/wiki/SQL`,
      name: 'SQL',
      nameExtra: 'Structured Query language',
    });
  });
});

describe('Test Extract year of creation', () => {
  test('Empty content', () => {
    expect(extractYearOfCreation('')).toMatchObject([]);
  });
  test('Single year confirmed', () => {
    expect(extractYearOfCreation('1987')).toMatchObject([1987]);
  });
  test('Single year not confirmed', () => {
    expect(extractYearOfCreation('1987?')).toMatchObject([1987]);
  });
  test('Range year', () => {
    expect(extractYearOfCreation('2009–2010')).toMatchObject([2009, 2010]);
  });
  test('Range year - Edge case 1', () => {
    expect(extractYearOfCreation('1958–62')).toMatchObject([1958, 1962]);
  });
});

describe('Test Extract language predecessors', () => {
  test('Empty content', () => {
    expect(extractPredecessors('')).toMatchObject([]);
  });

  test('Link with Plain text', () => {
    const content =
      '<a href="/wiki/C%2B%2B" title="C++">C++</a>, Standard C, <a href="/wiki/C_(programming_language)" title="C (programming language)">C</a>';

    expect(extractPredecessors(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/C%2B%2B`,
        name: 'C++',
        nameExtra: null,
      },
      {
        link: null,
        name: 'Standard C',
        nameExtra: null,
      },
      {
        link: `${WIKIPEDIA_URL}/wiki/C_(programming_language)`,
        name: 'C',
        nameExtra: null,
      },
    ]);
  });

  test('Link only', () => {
    const content =
      '<a href="/wiki/JavaScript" title="JavaScript">JavaScript</a>, <a href="/wiki/CoffeeScript" title="CoffeeScript">CoffeeScript</a>';

    expect(extractPredecessors(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/JavaScript`,
        name: 'JavaScript',
        nameExtra: null,
      },
      {
        link: `${WIKIPEDIA_URL}/wiki/CoffeeScript`,
        name: 'CoffeeScript',
        nameExtra: null,
      },
    ]);
  });

  test('Text only', () => {
    const content = 'Ada 2005, ISO/IEC 8652:1995/Amd 1:2007';

    expect(extractPredecessors(content)).toMatchObject([
      {
        link: null,
        name: 'Ada 2005',
        nameExtra: null,
      },
      {
        link: null,
        name: 'ISO/IEC 8652:1995/Amd 1:2007',
        nameExtra: null,
      },
    ]);
  });

  test('Link - Edge case 1', () => {
    const content =
      '<a href="/wiki/JavaScript" title="JavaScript">JavaScript</a>, <a href="/wiki/OCaml" title="OCaml">OCaml</a><sup id="cite_ref-13" class="reference"><a href="#cite_note-13">[13]</a></sup>';

    expect(extractPredecessors(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/JavaScript`,
        name: 'JavaScript',
        nameExtra: null,
      },
      {
        link: `${WIKIPEDIA_URL}/wiki/OCaml`,
        name: 'OCaml',
        nameExtra: null,
      },
    ]);
  });

  test('Link - With dead link', () => {
    const content =
      '<a href="/w/index.php?title=FARGO&amp;action=edit&amp;redlink=1" class="new" title="FARGO (page does not exist)">FARGO</a>, <a href="/wiki/IBM_RPG" title="IBM RPG">RPG</a>';

    expect(extractPredecessors(content)).toMatchObject([
      {
        link: null,
        name: 'FARGO',
        nameExtra: null,
      },
      {
        link: `${WIKIPEDIA_URL}/wiki/IBM_RPG`,
        name: 'RPG',
        nameExtra: null,
      },
    ]);
  });

  test('No predecessors', () => {
    const content = 'none (unique language)';

    expect(extractPredecessors(content)).toMatchObject([]);
  });

  test('No predecessors', () => {
    const content =
      'Operator programming - Alexey Andreevich Lyapunov &amp; <a href="/wiki/Kateryna_Yushchenko_(scientist)" title="Kateryna Yushchenko (scientist)">Kateryna Yushchenko</a> &amp; <a href="/wiki/MESM" title="MESM">MESM</a>';

    expect(extractPredecessors(content)).toMatchObject([
      {
        link: null,
        name: 'Operator programming',
        nameExtra: null,
      },
    ]);
  });
});

describe('Test Extract language author and place', () => {
  test('Empty content', () => {
    expect(extractAuthorAndPlace('')).toMatchObject([]);
  });

  test('Single author with no place', () => {
    const content = '<a href="/wiki/Joseph_Marie_Jacquard" title="Joseph Marie Jacquard">Joseph Marie Jacquard</a>';

    expect(extractAuthorAndPlace(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/Joseph_Marie_Jacquard`,
        name: 'Joseph Marie Jacquard',
      },
    ]);
  });

  test('Single author with no place - Edge case 1', () => {
    const content =
      '<a href="/wiki/Kathleen_Booth" title="Kathleen Booth">Kathleen Booth</a><sup id="cite_ref-1" class="reference"><a href="#cite_note-1">[1]</a></sup><sup id="cite_ref-2" class="reference"><a href="#cite_note-2">[2]</a></sup>';

    expect(extractAuthorAndPlace(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/Kathleen_Booth`,
        name: 'Kathleen Booth',
      },
    ]);
  });

  test('Two author with no place', () => {
    const content =
      '<a href="/wiki/John_von_Neumann" title="John von Neumann">John von Neumann</a> and <a href="/wiki/Herman_Goldstine" title="Herman Goldstine">Herman Goldstine</a>';

    expect(extractAuthorAndPlace(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/John_von_Neumann`,
        name: 'John von Neumann',
      },
      {
        link: `${WIKIPEDIA_URL}/wiki/Herman_Goldstine`,
        name: 'Herman Goldstine',
      },
    ]);
  });

  test('Two author with no place - Edge case 1', () => {
    const content = '<a href="/wiki/John_Mauchly" title="John Mauchly">John Mauchly</a> and William F. Schmitt';

    expect(extractAuthorAndPlace(content)).toMatchObject([
      {
        link: `${WIKIPEDIA_URL}/wiki/John_Mauchly`,
        name: 'John Mauchly',
      },
      {
        link: null,
        name: 'William F. Schmitt',
      },
    ]);
  });
});
