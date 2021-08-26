import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { FallbackProps } from 'react-error-boundary';

import { Button } from '@components/common/button';

type AppErrorProps = FallbackProps;

const AppError = ({ error, resetErrorBoundary }: AppErrorProps) => {
  console.log(error);

  return (
    <div className="container px-6 mx-auto h-full grid">
      <div className="px-12 py-12 w-1/2 mx-auto min-h-1/2 my-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center text-2xl mb-4 text-red-600">
          <ExclamationCircleIcon className="w-16 h-16" />
        </div>
        <h2 className="text-center font-bold text-3xl">Oops! Something when wrong.</h2>

        <p className="text-center text-xl my-10">
          There is a error while processing your request please contact the support.
        </p>

        <div className="flex justify-center mt-8">
          <Button text="Reset" color="red" onClick={() => resetErrorBoundary()} />
        </div>
      </div>
    </div>
  );
};

export { AppError };
