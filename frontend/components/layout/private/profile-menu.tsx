import Link from 'next/link';
import { UserIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';

import { useClickOutside } from '@hooks/useClickOutside';
import { useCustomRef } from '@hooks/useCustomRef';

type ProfileMenuProps = {
  closeModal: () => void;
  handleLogout: () => void;
};

const ProfileMenu = ({ closeModal, handleLogout }: ProfileMenuProps) => {
  const ref = useCustomRef<any>();

  useClickOutside(ref, () => closeModal());

  return (
    <ul
      className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
      aria-label="submenu"
      ref={ref}
      data-testid="account-menu-list"
    >
      <li className="flex">
        <Link
          href="/profile"
          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">

          <UserIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Profile</span>

        </Link>
      </li>
      <li className="flex">
        <Link
          href="/settings"
          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">

          <CogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Settings</span>

        </Link>
      </li>
      <li className="flex">
        <a
          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          data-testid="lnk-logout"
          href="#"
          onClick={handleLogout}
        >
          <LogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
          <span>Log out</span>
        </a>
      </li>
    </ul>
  );
};

export { ProfileMenu };
