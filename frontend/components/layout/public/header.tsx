import Link from 'next/link';
import { Img } from '@components/common/img';
import GithubIcon from '@components/icons/github';

const PublicHeader = () => {
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link href="/">
                <a className="flex-shrink-0">
                  <Img className="h-8 w-8" src="/assets/img/logo.png" alt="Logo"/>
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/">
                    <a className="text-black hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-base font-light" data-testid="lnk-home">
                      Home
                    </a>
                  </Link>
                  <Link href="/documentation">
                    <a className="text-black hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-base font-light" data-testid="lnk-documentation">
                      Documentation
                    </a>
                  </Link>
                  <Link href="/playground">
                    <a className="text-black hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-base font-light" data-testid="lnk-playground">
                      GraphQL
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <a href="https://github.com/osscameroon/prolang-api"
                  className="p-1 rounded-full text-gray-200 hover:text-gray-200"
                  target="_blank" rel="noreferrer"
                >
                  <span className="sr-only">View github</span>
                  <GithubIcon />
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md">
                <GithubIcon width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
            </Link>
            <Link href="/documentation">
              <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium">
                Documentation
              </a>
            </Link>
            <Link href="/playground">
              <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                GraphQL
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PublicHeader;
