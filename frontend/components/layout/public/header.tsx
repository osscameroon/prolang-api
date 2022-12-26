import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/outline';
import { Img } from '@components/common/img';
import GithubIcon from '@components/icons/github';
import { useClickOutside } from '@hooks/useClickOutside';
import { useBooleanState } from '@hooks/useBooleanState';
import { useCustomRef } from '@hooks/useCustomRef';

const PublicHeader = () => {
  const ref = useCustomRef<any>();
  const [isMenuOpened, openMenu, closeMenu] = useBooleanState(false);

  useClickOutside(ref, () => closeMenu());

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link href="/" className="flex-shrink-0">

                <Img className="h-8 w-8" src="/assets/img/logo.png" width={32} height={32} alt="Logo" />

              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="navbar-link" data-testid="lnk-home">
                    
                      Home
                    
                  </Link>
                  <Link
                    href="/documentation"
                    className="navbar-link"
                    data-testid="lnk-documentation">
                    
                      Documentation
                    
                  </Link>
                  <Link href="/playground" className="navbar-link" data-testid="lnk-playground">
                    
                      GraphQL
                    
                  </Link>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6 xs:hidden sm:hidden md:block">
                <Link
                  href="https://github.com/osscameroon/prolang-api"
                  className="p-1 rounded-full text-gray-200 hover:text-gray-200"
                  target="_blank"
                  rel="noreferrer">

                  <span className="sr-only">View github</span>
                  <GithubIcon />

                </Link>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                aria-label="Open menu"
                className="text-gray-800 dark:text-white hover:text-blue-500 inline-flex items-center justify-center p-2 rounded-md"
                onClick={() => openMenu()}
              >
                <MenuIcon width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden" ref={ref}>
          {isMenuOpened && (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="mobile-navbar-link">
                Home
              </Link>
              <Link href="/documentation" className="mobile-navbar-link">
                Documentation
              </Link>
              <Link href="/playground" className="mobile-navbar-link">
                GraphQL
              </Link>
              <Link
                href="https://github.com/osscameroon/prolang-api"
                className="mobile-navbar-link"
                target="_blank"
                rel="noreferrer">
                
                  GitHub Repository
                
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export { PublicHeader };
