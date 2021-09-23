import { ArrowCircleRightIcon, DesktopComputerIcon } from '@heroicons/react/outline';
import { withPublicLayout } from '@components/hof/with-public-layout';
import { Img } from '@components/common/img';
import MicroserviceIcon from '@components/icons/microservice';
import GraphqlIcon from '@components/icons/graphql';


const Home = () => {
  return (
    <>
      <div className="w-full" >
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
                  <button type="button" className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Go to Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 pt-10 pb-20 dark:bg-gray-800" >
        <div className="w-2/3 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl text-indigo-500">Features</div>
          <p className="mt-2 text-2xl text-center leading-8 tracking-tight text-gray-900 dark:text-white">
            Two ways to browse programing languages
          </p>
          <div className="w-full flex justify-around">
            <div className="w-5/12 px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex flex-col items-center">
                <MicroserviceIcon />
                <div>REST</div>
              </div>
              <p className="text-md text-gray-500 dark:text-gray-300 py-4">
                Encompassing today’s website design technology to integrated and build solutions
                relevant to your business.
              </p>

              <button type="button" className="flex justify-center py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                View documentation {' '}
                <ArrowCircleRightIcon className="ml-2 h-6 w-6" />
              </button>
            </div>

            <div className="w-5/12 px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex flex-col items-center">
                <GraphqlIcon />
                <div>GraphQL</div>
              </div>
              <p className="text-md text-gray-500 dark:text-gray-300 py-4">
                Encompassing today’s website design technology to integrated and build solutions
                relevant to your business.
              </p>
              <button type="button" className="flex justify-center py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Go to playground
                <DesktopComputerIcon className="ml-2 h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-10 dark:bg-gray-800" >
        <div className="w-2/3 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl text-indigo-500">Some languages</div>
          <div className="w-full flex justify-between">
            <div className="w-[30%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex items-center">
                <MicroserviceIcon height={48} width={48} />
                <div className="ml-4">Javascript</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Year of creation: </div>
                <div className="w-1/2 font-bold text-sm">1995</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Company: </div>
                <div className="w-1/2 font-bold text-sm">Sun Microsystems</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Author: </div>
                <div className="w-1/2 font-bold text-sm">Jack Ballard</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Predecessors: </div>
                <div className="w-1/2 font-bold text-sm">Java, Typescript</div>
              </div>
            </div>
            <div className="w-[30%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex items-center">
                <MicroserviceIcon height={48} width={48} />
                <div className="ml-4">C#</div>
              </div>
            </div>
            <div className="w-[30%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex items-center">
                <MicroserviceIcon height={48} width={48} />
                <div className="ml-4">PHP</div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div className="w-[30%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex items-center">
                <MicroserviceIcon height={48} width={48} />
                <div className="ml-4">Java</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Year of creation: </div>
                <div className="w-1/2 font-bold text-sm">1995</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Company: </div>
                <div className="w-1/2 font-bold text-sm">Sun Microsystems</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Author: </div>
                <div className="w-1/2 font-bold text-sm">Jack Ballard</div>
              </div>
              <div className="border-purple-500 flex mt-4">
                <div className="w-1/2">Predecessors: </div>
                <div className="w-1/2 font-bold text-sm">Java, Typescript</div>
              </div>
            </div>
            <div className="w-[30%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex items-center">
                <MicroserviceIcon height={48} width={48} />
                <div className="ml-4">Go</div>
              </div>
            </div>
            <div className="w-[30%] px-8 py-8 bg-white mt-6 shadow-lg rounded-lg dark:bg-gray-800 cursor-default">
              <div className="font-bold text-base flex items-center">
                <MicroserviceIcon height={48} width={48} />
                <div className="ml-4">Python</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withPublicLayout(Home);