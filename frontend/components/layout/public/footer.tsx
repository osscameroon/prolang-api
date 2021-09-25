import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/solid';

import GithubIcon from '@components/icons/github';
import TwitterIcon from '@components/icons/twitter';

const PublicFooter = () => {
  return (
    <footer className="w-full border-t-2 shadow border-gray-50 mt-12 relative">
      <div className="w-full flex items-center justify-between m-auto text-gray-800 text-sm md:flex-row max-w-6xl h-16">
        <div>© Copyright 2021. OSS Cameroon.</div>
        <div className="flex items-center">
          <Link href="https://github.com/osscameroon/">
            <a className="w-6 mx-1" target="_blank" rel="noreferrer nopener">
              <GithubIcon height={28} width={28} />
            </a>
          </Link>
          <Link href="https://twitter.com/osscameroon">
            <a className="w-6 mx-6" target="_blank" rel="noreferrer nopener">
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
