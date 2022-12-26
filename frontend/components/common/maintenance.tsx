import Link from 'next/link';
import { HandIcon } from '@heroicons/react/outline';

const Maintenance = () => {
  return (
    <div className="container px-6 mx-auto h-screen flex items-center">
      <div className="px-12 py-12 xs:w-full sm:w-2/3 lg:w-1/2 mx-auto min-h-1/2 my-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center text-2xl mb-4 text-blue-600">
          <HandIcon className="w-16 h-16" />
        </div>
        <h2 className="text-center font-bold text-3xl">Maintenance in progress...</h2>

        <p className="text-center text-xl my-10">
          The website is not available for the moment. Feel free to contact the admin if the problem persist
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="mailto:tericcabel@yahoo.com?subject=Prolang website down"
            className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white bg-blue-600 border border-transparent rounded-lg focus:outline-none"
            data-testid="lnk-email">
            
              Contact the admin
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Maintenance };
