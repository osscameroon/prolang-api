import { useState } from 'react';
import { PlayIcon } from '@components/icons/play';
import { Spinner } from '@components/common/loader';
import { PublicLayout } from '@components/layout/public/public-layout';

const GraphQLPlayground = () => {
  const [loading, setLoading] = useState(true);

  return (
    <PublicLayout path='/playground' title='GraphQL Playground'>
      <div className="xs:w-full xs:px-4 md:w-11/12 2xl:w-2/3 mx-auto min-h-[calc(100vh-130px)]">
        <div className="pt-4 mb-4">
          <h1 className="text-2xl font-bold mb-4">GraphQL Playground</h1>
          <p>
            <div className="flex flex-col">
              <div className="mb-2">1. Write your query on the left pane.</div>
              <div className="flex mb-2">
              2. Click on the play button{' '}
                <span className="mx-2 text-blue-500">
                  <PlayIcon />
                </span>{' '}
              to execute the query.
              </div>
              <div>3. View the result on the right pane.</div>
            </div>
          </p>
        </div>

        <div className="mb-8">
          {loading ? (
            <div className="flex flex-col items-center">
              <Spinner text="Loading the playground..." />
            </div>
          ) : null}
          <iframe
            onLoad={() => setLoading(false)}
            className="w-full h-[calc(100vh-330px)]"
            src={process.env.NEXT_PUBLIC_GRAPHQL_URL}
          />
        </div>
      </div>
    </PublicLayout>
  );
};

export default GraphQLPlayground;
