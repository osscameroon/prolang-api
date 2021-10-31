import { useState } from 'react';
import { useQueryClient } from 'react-query';
import router from 'next/router';

import ProfileMenu from '@components/layout/private/profile-menu';
import { LetterAvatar } from '@components/common/letter-avatar';
import { useAuth } from '@hooks/useAuth';

const PrivateHeader = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { deleteToken, user } = useAuth();
  const queryClient = useQueryClient();

  const toggleProfileMenuOpen = () => {
    setIsProfileMenuOpen((prevValue) => !prevValue);
  };

  const logout = async () => {
    deleteToken();

    queryClient.getQueryCache().clear();

    await router.push('/');
  };

  const fullName = `${user?.name || ''}`;

  return (
    <header className="z-10 py-4 px-10 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="items-center flex rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={toggleProfileMenuOpen}
              aria-label="Account"
              aria-haspopup="true"
              data-cy="btn-account-menu"
            >
              <div className="mr-2" data-cy="username">{fullName}</div>
              <LetterAvatar name={fullName} size={32} />
            </button>
            {isProfileMenuOpen && <ProfileMenu closeModal={toggleProfileMenuOpen} handleLogout={logout} />}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PrivateHeader;
