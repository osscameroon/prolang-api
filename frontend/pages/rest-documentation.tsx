import { useState } from 'react';

import { withPublicLayout } from '@components/hof/with-public-layout';

const RestDocumentation = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full overflow-y-auto" >
      {loading ? (
        <div
          className="loading text-center border-4 h-80 w-52 mt-60"
        />
      ) : null}
      <iframe
        onLoad={() => setLoading(false)}
        className="w-full h-screen overflow-y-auto"
        src={process.env.NEXT_PUBLIC_API_DOC_URL}
      />
    </div>
  );
};

export default withPublicLayout(RestDocumentation);
