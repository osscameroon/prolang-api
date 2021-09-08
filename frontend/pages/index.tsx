import { withPublicLayout } from '@components/hof/with-public-layout';

const Home = () => {
  return (
    <div className="w-full h-full overflow-y-auto" >
      Hello World
    </div>
  );
};

export default withPublicLayout(Home);