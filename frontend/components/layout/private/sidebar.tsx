import { HomeIcon, CollectionIcon } from '@heroicons/react/outline';

import SidebarLink from '@components/common/sidebar-link';

const PrivateSidebar = () => {
  return (
    <>
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
            PROLANG
          </a>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <SidebarLink href="/dashboard">
                <HomeIcon className="w-5 h-5" aria-hidden="true"/>
                <span className="ml-4">Dashboard</span>
              </SidebarLink>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              <SidebarLink href="/languages">
                <CollectionIcon className="w-5 h-5" aria-hidden="true"/>
                <span className="ml-4">Languages</span>
              </SidebarLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default PrivateSidebar;