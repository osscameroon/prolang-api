import Link from 'next/link';

import ExternalIcon from '@components/icons/external';
import { LightLanguage } from '@typings/common';

type LanguageCardItemProps = {
  data: LightLanguage;
};

const LanguageCardItem = ({ data }: LanguageCardItemProps) => {
  const { author, company, icon, link, name, predecessors, yearOfCreation } = data;

  return (
    <div className="w-[30%] px-8 py-8 bg-white mt-6 mb-6 shadow rounded-lg dark:bg-gray-800 cursor-default">
      <div className="font-bold text-base flex items-center justify-between">
        <div className="flex items-center">
          {icon}
          <div className="ml-4">{name}</div>
        </div>
        <div>
          <Link href={link}>
            <a target="_blank" rel="noreferrer nopener"><ExternalIcon /></a>
          </Link>
        </div>
      </div>
      <div className="border-purple-500 flex mt-4">
        <div className="w-1/2">Year of creation: </div>
        <div className="w-1/2 font-bold text-sm">{yearOfCreation}</div>
      </div>
      <div className="border-purple-500 flex mt-4">
        <div className="w-1/2">Company: </div>
        <div className="w-1/2 font-bold text-sm">{company}</div>
      </div>
      <div className="border-purple-500 flex mt-4">
        <div className="w-1/2">Author: </div>
        <div className="w-1/2 font-bold text-sm">{author}</div>
      </div>
      <div className="border-purple-500 flex mt-4">
        <div className="w-1/2">Predecessors: </div>
        <div className="w-1/2 font-bold text-sm">{predecessors.join(', ')}</div>
      </div>
    </div>
  );
};

export { LanguageCardItem };