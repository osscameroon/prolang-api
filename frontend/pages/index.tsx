import Link from 'next/link';
import { ArrowCircleRightIcon, TerminalIcon } from '@heroicons/react/outline';

import { withPublicLayout } from '@components/hof/with-public-layout';
import MicroserviceIcon from '@components/icons/microservice';
import GraphqlIcon from '@components/icons/graphql';
import { LanguageCard } from '@components/languages/language-card';
import { Tile } from '@components/common/tile';

const Home = () => {
  return (
    <div>
      <div className="w-full">
        <div className="xs:w-full sm:w-5/6 md:w-2/3 mx-auto overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 ">
            <div className="text-center w-full mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8 z-20">
              <h2 className="xs:text-2xl font-extrabold text-black dark:text-white sm:text-4xl">
                <span className="block">The API to browse programming languages</span>
                <div className="mt-4" />
                <span className="block text-blue-500">From the beginning until today</span>
              </h2>
              <div className="lg:mt-8 lg:flex-shrink-0">
                <div className="mt-12 inline-flex rounded-md shadow">
                  <Link href="/documentation">
                    <a className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg">
                      Go to Documentation
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-100 pt-10 xs:pb-8 sm:pb-20 dark:bg-gray-800">
        <div className="xs:w-full md:w-11/12 xl:w-2/3 xs:px-4 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl xs:text-2xl text-blue-700">Fetch mode</div>
          <p className="mt-2 mb-4 text-2xl xs:text-xl text-center leading-8 tracking-tight text-gray-900 dark:text-white">
            Retrieve data using the mode that suits you
          </p>
          <div className="w-full xs:flex-column sm:flex-row sm:flex sm:justify-around md:justify-between">
            <Tile
              icon={<MicroserviceIcon />}
              title="REST"
              linkText="View documentation"
              linkHref="/documentation"
              linkIcon={<ArrowCircleRightIcon className="ml-2 h-6 w-6" />}
            >
              Easy to start and integrate in existing application because you don't need to learn a query language
              first.
            </Tile>

            <Tile
              icon={<GraphqlIcon />}
              title="GraphQL"
              linkText="Go to playground"
              linkHref="/playground"
              linkIcon={<TerminalIcon className="ml-2 h-6 w-6" />}
            >
              Retrieve only the data you need in a structured way. Make one network call to fetch all the data linked
              together.
            </Tile>
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-10 dark:bg-gray-800">
        <div className="xs:w-full md:w-11/12 xl:w-[90%] 2xl:w-2/3 xs:px-4 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl xs:text-2xl text-blue-700">
            Popular languages
          </div>
          <LanguageCard />
        </div>
      </div>
    </div>
  );
};

export default withPublicLayout(Home, { title: 'Home' });
