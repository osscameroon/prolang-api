import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/solid';

import GithubIcon from '@components/icons/github';
import TwitterIcon from '@components/icons/twitter';

const PublicFooter = () => {
  return (
    <footer className="w-full bg-white shadow relative">
      <div className="w-full flex items-center justify-between m-auto text-gray-800 text-sm md:flex-row max-w-6xl h-16 xs:px-2 sm:px-6">
        <div className="xs:text-xs">© Copyright 2021. OSS Cameroon.</div>
        <div className="flex items-center xs:justify-end xs:w-2/5">
          <Link href="https://github.com/osscameroon/">
            <a className="w-6 mx-1" target="_blank" rel="noreferrer nopener">
              <GithubIcon height={28} width={28} />
            </a>
          </Link>
          <Link href="https://twitter.com/osscameroon">
            <a className="w-6 mx-6 xs:ml-2 xs:mr-1" target="_blank" rel="noreferrer nopener">
              <TwitterIcon height={24} width={24} />
            </a>
          </Link>
          <Link href="https://osscameroon.com/">
            <a className="w-6 mx-1" target="_blank" rel="noreferrer nopener">
              <GlobeAltIcon width={30} height={30} />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
