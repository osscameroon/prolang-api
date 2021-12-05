import { LightLanguage } from '@typings/common';
import { LanguageCardItem } from '@components/languages/language-card-item';
import JavascriptIcon from '@components/icons/javascript';
import JavaIcon from '@components/icons/java';
import CsharpIcon from '@components/icons/csharp';
import PythonIcon from '@components/icons/python';
import GolangIcon from '@components/icons/golang';
import CppIcon from '@components/icons/cplusplus';

const languages: LightLanguage[] = [
  {
    author: 'Brendan Eich',
    company: 'Netscape',
    icon: <JavascriptIcon />,
    link: 'https://en.wikipedia.org/wiki/JavaScript',
    name: 'Javascript',
    predecessors: ['LiveScript'],
    yearOfCreation: 1995,
  },
  {
    author: 'Bjarne Stroustrup',
    company: 'ISO/IEC JTC1',
    icon: <CppIcon />,
    link: 'https://en.wikipedia.org/wiki/C%2B%2B',
    name: 'C++',
    predecessors: ['C'],
    yearOfCreation: 1983,
  },
  {
    author: 'Ken Thompson',
    company: 'Google',
    icon: <GolangIcon />,
    link: 'https://en.wikipedia.org/wiki/Go_(programming_language)',
    name: 'Golang',
    predecessors: ['C', 'Limbo', 'Oberon'],
    yearOfCreation: 2009,
  },
  {
    author: 'James Gosling',
    company: 'Sun Microsystems',
    icon: <JavaIcon />,
    link: 'https://en.wikipedia.org/wiki/Java_(programming_language)',
    name: 'Java',
    predecessors: ['C', 'C++', 'Objective C'],
    yearOfCreation: 1995,
  },
  {
    author: 'Guido Van Rossum',
    company: 'Python Software Foundation',
    icon: <PythonIcon />,
    link: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
    name: 'Python',
    predecessors: ['ABC', 'C'],
    yearOfCreation: 1991,
  },
  {
    author: 'Anders Hejlsberg',
    company: 'Microsoft',
    icon: <CsharpIcon />,
    link: 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)',
    name: 'C#',
    predecessors: ['C', 'C++', 'Delphi', 'Java'],
    yearOfCreation: 2000,
  },
];

const LanguageCard = () => {
  return (
    <div className="w-full mt-8 grid xl:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 gap-x-6 gap-y-6">
      {languages.map((language) => (
        <LanguageCardItem data={language} key={language.name} />
      ))}
    </div>
  );
};

export { LanguageCard };
