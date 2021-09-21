import { withPublicLayout } from '@components/hof/with-public-layout';
import { Img } from '@components/common/img';

const Home = () => {
  return (
    <>
      <div className="w-full" >
        <div className="w-2/3 mx-auto overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 ">
            <div className="text-center w-full mx-auto py-16 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
              <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                <span className="block">
                The API to browse programming languages
                </span>
                <div className="mt-4"/>
                <span className="block text-indigo-500">
                From the beginning until today
                </span>
              </h2>
              <div className="lg:mt-0 lg:flex-shrink-0 mt-8">
                <div className="mt-12 inline-flex rounded-md shadow">
                  <button type="button"
                    className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                Go to Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800" >
        <div className="w-2/3 mx-auto">
          <div className="w-full text-center uppercase font-bold text-3xl text-purple-800">Features</div>
          <p className="mt-2 text-2xl text-center leading-8 tracking-tight text-gray-900 dark:text-white">
            Two ways to browse programing languages
          </p>
        </div>
      </div>
    </>
  );
};

export default withPublicLayout(Home);