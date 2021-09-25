import { LightLanguage } from '@typings/common';
import MicroserviceIcon from '@components/icons/microservice';
import { LanguageCardItem } from '@components/languages/language-card-item';

const list: LightLanguage[] = [
  {
    author: 'Breindan Eich',
    company: 'Netscape',
    icon: <MicroserviceIcon width={48} height={48} />,
    link: '',
    name: 'Javascript',
    predecessors: [],
    yearOfCreation: 1995
  },
  {
    author: '',
    company: 'Microsoft',
    icon: <MicroserviceIcon width={48} height={48} />,
    link: '',
    name: 'C#',
    predecessors: [],
    yearOfCreation: 1995
  },
  {
    author: '',
    company: '',
    icon: <MicroserviceIcon width={48} height={48} />,
    link: '',
    name: 'PHP',
    predecessors: [],
    yearOfCreation: 1995
  },
  {
    author: '',
    company: '',
    icon: <MicroserviceIcon width={48} height={48} />,
    link: '',
    name: 'Java',
    predecessors: [],
    yearOfCreation: 1995
  },
  {
    author: '',
    company: '',
    icon: <MicroserviceIcon width={48} height={48} />,
    link: '',
    name: 'Golang',
    predecessors: [],
    yearOfCreation: 1995
  },
  {
    author: '',
    company: '',
    icon: <MicroserviceIcon width={48} height={48} />,
    link: '',
    name: 'Python',
    predecessors: [],
    yearOfCreation: 1995
  },
];


const LanguageCard = () => {
  return (
    <div className="w-full flex flex-wrap justify-between">
      {list.map((language) => <LanguageCardItem data={language} key={language.name} />)}
    </div>
  );
};

export { LanguageCard };