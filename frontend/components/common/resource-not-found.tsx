import Link from 'next/link';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

type ResourceNotFoundProps = {
  name: string;
};

const ResourceNotFound = ({ name }: ResourceNotFoundProps) => {
  return (
    <div className="container px-6 mx-auto h-full grid">
      <div className="px-12 py-12 w-1/2 mx-auto min-h-1/2 my-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center text-2xl mb-4 text-red-600">
          <ExclamationCircleIcon className="w-16 h-16" />
        </div>
        <h2 className="text-center font-bold text-3xl">{name} not found</h2>

        <p className="text-center text-xl my-10">It looks like the item you are looking for doesn't exists.</p>

        <div className="flex justify-center mt-8">
          <Link href="/dashboard">
            <a className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white bg-red-600 border border-transparent rounded-lg focus:outline-none">
              Go to dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ResourceNotFound };
