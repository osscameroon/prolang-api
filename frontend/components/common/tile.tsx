import { ReactNode, PropsWithChildren } from 'react';
import Link from 'next/link';

type TileProps = PropsWithChildren<{
  icon: ReactNode;
  title: string;
  linkText: string;
  linkHref: string;
  linkIcon: ReactNode;
}>;

const Tile = ({ children, icon, linkHref, linkIcon, linkText, title }: TileProps) => {
  return (
    <div className="w-5/12 px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
      <div className="flex flex-col items-center">
        {icon}
        <div className="font-bold text-lg mt-2">{title}</div>
      </div>
      <p className="text-md text-gray-500 dark:text-gray-300 py-4">
        {children}
      </p>

      <Link href={linkHref}>
        <a className="flex justify-center py-2 px-4 mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg ">
          {linkText} {' '}
          {linkIcon}
        </a>
      </Link>
    </div>
  );
};

export { Tile };
