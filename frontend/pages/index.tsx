import Link from 'next/link';

const Home = () => {
  return (
    <div className="w-full h-full overflow-y-auto" >
      <Link href="/documentation"><a>Go to documentation</a></Link>
    </div>
  );
};

export default Home;