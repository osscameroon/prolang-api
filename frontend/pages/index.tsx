import Link from 'next/link';
import { ArrowCircleRightIcon, DesktopComputerIcon, } from '@heroicons/react/outline';

import { withPublicLayout } from '@components/hof/with-public-layout';
import MicroserviceIcon from '@components/icons/microservice';
import GraphqlIcon from '@components/icons/graphql';
import { LanguageCard } from '@components/languages/language-card';
import { Tile } from '@components/common/tile';

const Home = () => {
  return (
    <div>
      <div className="w-full">
        <div className="w-2/3 mx-auto overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 ">
            <div className="text-center w-full mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8 z-20">
              <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                <span className="block">The API to browse programming languages</span>
                <div className="mt-4"/>
                <span className="block text-indigo-500">From the beginning until today</span>
              </h2>
              <div className="lg:mt-8 lg:flex-shrink-0">
                <div className="mt-12 inline-flex rounded-md shadow">
                  <Link href="/rest-documentation">
                    <a className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      Go to Documentation
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-purple-100 pt-10 pb-20 dark:bg-gray-800" >
        <div className="w-2/3 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl text-indigo-500">Features</div>
          <p className="mt-2 mb-4 text-2xl text-center leading-8 tracking-tight text-gray-900 dark:text-white">
            Two ways to browse programing languages
          </p>
          <div className="w-full flex justify-around">
            <Tile
              icon={<MicroserviceIcon />}
              title="REST"
              linkText="View documentation"
              linkHref="/rest-documentation"
              linkIcon={<ArrowCircleRightIcon className="ml-2 h-6 w-6" />}
            >
              Encompassing today’s website design technology to integrated and build solutions
              relevant to your business.
            </Tile>

            <Tile
              icon={<GraphqlIcon />}
              title="GraphQL"
              linkText="Go to playground"
              linkHref="/gql-playground"
              linkIcon={<DesktopComputerIcon className="ml-2 h-6 w-6" />}
            >
              Encompassing today’s website design technology to integrated and build solutions
              relevant to your business.
            </Tile>
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-10 dark:bg-gray-800" >
        <div className="w-2/3 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl text-indigo-500">Popular languages</div>
          <LanguageCard />
        </div>
      </div>
    </div>
  );
};

export default withPublicLayout(Home);