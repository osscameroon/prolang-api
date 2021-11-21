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
    <div className="xs:w-full sm:w-[46%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
      <div className="flex flex-col items-center">
        {icon}
        <div className="font-bold text-lg mt-2">{title}</div>
      </div>
      <p className="text-md text-gray-500 dark:text-gray-300 py-4">{children}</p>

      <Link href={linkHref}>
        <a className="flex justify-center py-2 px-4 mt-6 w-full text-base font-semibold rounded-lg bg-white border-2 border-blue-700 text-blue-700">
          {linkText} {linkIcon}
        </a>
      </Link>
    </div>
  );
};

export { Tile };
