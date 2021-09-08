import { withPublicLayout } from '@components/hof/with-public-layout';

const RestDocumentation = () => {
  return (
    <div className="w-full h-full overflow-y-auto" >
      <iframe 
        className="w-full h-screen overflow-y-auto"
        src={process.env.NEXT_PUBLIC_API_DOC_URL}
      />
    </div>
  );
};

export default withPublicLayout(RestDocumentation);
