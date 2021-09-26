import { RedocStandalone } from 'redoc';
import { withPublicLayout } from '@components/hof/with-public-layout';

const Documentation = () => {
  return (
    <div className="min-h-[calc(100vh-130px)]">
      <RedocStandalone specUrl={process.env.NEXT_PUBLIC_API_DOC_URL} />
    </div>
  );
};

export default withPublicLayout(Documentation, { path: '/documentation', title: 'API Documentation' });
