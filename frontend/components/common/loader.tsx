import classNames from 'classnames';

type LoaderProps = {
  scope?: 'page' | 'component';
};
type SpinnerProps = {
  text?: string;
}

const Spinner = ({ text = 'Loading...' }: SpinnerProps) => {
  return (
    <>
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mb-4" />
      <h2 className="text-center text-blue-500 text-xl font-semibold">{text}</h2>
    </>
  );
};

const Loader = ({ scope = 'component' }: LoaderProps) => {
  const loaderClasses = classNames(
    'top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-200 opacity-75 flex flex-col items-center justify-center',
    {
      absolute: scope === 'component',
      fixed: scope === 'page',
    },
  );

  return (
    <div className={loaderClasses}>
      <Spinner />
    </div>
  );
};

export { Loader, Spinner };
