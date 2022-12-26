import Link from 'next/link';
import { PencilIcon, XIcon } from '@heroicons/react/solid';

import { Author } from '@typings/common';
import { LetterAvatar } from '@components/common/letter-avatar';
import { formatDate } from '@utils/common';

type AuthorRowProps = {
  item: Author;
  triggerDeleteDialog: () => void;
};

const AuthorRow = ({ item, triggerDeleteDialog }: AuthorRowProps) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <LetterAvatar name={item.name} size={40} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{formatDate(item.birthDate)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{item.country || 'None'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {item.link && <Link href={item.link} target="_blank">View more</Link>}
        </div>
      </td>
      <td className="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`/authors/${item.id}`}
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

export { AuthorRow };
