import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const SidebarLink = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  const router = useRouter();

  const linkClasses = classNames({
    'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200': true,
    'text-gray-800': router.asPath === href,
  });

  return (
    <Link href={href}>
      <a className={linkClasses}>
        {children}
      </a>
    </Link>
  );
};

export default SidebarLink;
