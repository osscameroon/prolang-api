import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/solid';

import GithubIcon from '@components/icons/github';
import TwitterIcon from '@components/icons/twitter';

const PublicFooter = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-white shadow relative">
      <div className="w-full flex items-center justify-between m-auto text-gray-800 text-sm md:flex-row max-w-6xl h-16 xs:px-2 sm:px-6">
        <div className="xs:text-xs">© Copyright {year}. OSS Cameroon.</div>
        <div className="flex items-center xs:justify-end xs:w-2/5">
          <Link
            href="https://github.com/osscameroon/"
            className="w-6 mx-1"
            target="_blank"
            rel="noreferrer nopener"
            aria-label="View GitHub organization">

            <GithubIcon height={28} width={28} />

          </Link>
          <Link
            href="https://twitter.com/osscameroon"
            className="w-6 mx-6 xs:ml-2 xs:mr-1"
            target="_blank"
            rel="noreferrer nopener"
            aria-label="Go to Twitter">

            <TwitterIcon height={24} width={24} />

          </Link>
          <Link
            href="https://osscameroon.com/"
            className="w-6 mx-1"
            target="_blank"
            rel="noreferrer nopener"
            aria-label="Go to the website">

            <GlobeAltIcon width={30} height={30} />

          </Link>
        </div>
      </div>
    </footer>
  );
};

export { PublicFooter };
