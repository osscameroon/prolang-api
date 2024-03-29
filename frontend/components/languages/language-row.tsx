import Link from 'next/link';
import { PencilIcon, XIcon } from '@heroicons/react/solid';

import { Language } from '@typings/common';
import { LetterAvatar } from '@components/common/letter-avatar';

type LanguageRowProps = {
  item: Language;
  triggerDeleteDialog: () => void;
};

const renderAuthors = (authors: Language['authors']) => {
  if (authors?.length) {
    const [author1, author2] = authors;

    return `${author1.name}${ author2 ? `, ${ author2.name}` : ''}${authors.length > 2 ? ', ...' : ''}`;
  }

  return 'none';
};

const renderPredecessors = (predecessors: Language['predecessors']) => {
  if (predecessors?.length) {
    const [language1, language2] = predecessors;

    return `${language1.name}${ language2 ? `, ${ language2.name}` : ''}${predecessors.length > 2 ? ', ...' : ''}`;
  }

  return 'none';
};

const renderNameWithLink = (name: string, link: string | null) => {
  if (link) {
    return <Link href={link} target="_blank">{name}</Link>;
  }

  return name;
};

const LanguageRow = ({ item, triggerDeleteDialog }: LanguageRowProps) => {
  const { link, name, nameExtra } = item;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <LetterAvatar name={item.name} size={40} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {renderNameWithLink(name, link)}
              { nameExtra.name && <> ({renderNameWithLink(nameExtra.name, link)}) </>}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{item.years.join(' - ')}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{renderAuthors(item.authors)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{item.company || 'none'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{renderPredecessors(item.predecessors)}</div>
      </td>
      <td className="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`/languages/${item.id}`}
          className="flex items-center justify-between px-1.5 py-1.5 text-lg font-medium leading-5 bg-white border border-transparent rounded-lg hover:border-purple-600 hover:text-purple-700 focus:outline-none"
          aria-label="Edit">

          <PencilIcon className="h-5 w-5 text-purple-600" />

        </Link>
        <button
          className="flex items-center justify-between ml-2 px-1.5 py-1.5 text-lg font-medium leading-5 bg-white border border-transparent rounded-lg hover:border-red-600 hover:text-red-700 focus:outline-none"
          aria-label="Delete"
          onClick={triggerDeleteDialog}
        >
          <XIcon className="h-5 w-5 text-red-600" />
        </button>
      </td>
    </tr>
  );
};

export { LanguageRow };
