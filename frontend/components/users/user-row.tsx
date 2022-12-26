import Link from 'next/link';
import { PencilIcon, XIcon } from '@heroicons/react/solid';

import { User, UserRoleEnum } from '@typings/common';
import { LetterAvatar } from '@components/common/letter-avatar';

type UserRowProps = {
  canEdit: boolean;
  canDelete: boolean;
  item: User;
  triggerDeleteDialog: () => void;
};

const UserRow = ({ canDelete, canEdit, item, triggerDeleteDialog }: UserRowProps) => {
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
        <div className="text-sm font-medium text-gray-900">{item.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {item.role === UserRoleEnum.USER ? 'User' : 'Admin'}
        </span>
      </td>
      <td className="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {canEdit && (
          (<Link
            href={`/users/${item.id}`}
            className="flex items-center justify-between px-1.5 py-1.5 text-lg font-medium leading-5 bg-white border border-transparent rounded-lg hover:border-purple-600 hover:text-purple-700 focus:outline-none"
            aria-label="Edit">

            <PencilIcon className="h-5 w-5 text-purple-600" />

          </Link>)
        )}
        {canDelete && (
          <button
            className="flex items-center justify-between ml-2 px-1.5 py-1.5 text-lg font-medium leading-5 bg-white border border-transparent rounded-lg hover:border-red-600 hover:text-red-700 focus:outline-none"
            aria-label="Delete"
            onClick={triggerDeleteDialog}
          >
            <XIcon className="h-5 w-5 text-red-600" />
          </button>
        )}
      </td>
    </tr>
  );
};

export { UserRow };
