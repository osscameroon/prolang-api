import dynamic from 'next/dynamic';
import { RedocStandaloneProps } from 'redoc';
import { PublicLayout } from '@components/layout/public/public-layout';

const RedocStandalone = dynamic<RedocStandaloneProps>(() => import('redoc').then((mod) => mod.RedocStandalone));

const theme = {
  colors: {
    primary: {
      contrastText: '#fff',
      main: '#32329f',
    },
  },
  rightPanel: {
    backgroundColor: '#161B2C',
    textColor: '#FFF',
  },
  sidebar: {
    activeTextColor: '#32329f',
    backgroundColor: '#fafafa',
    textColor: '#333333',
    width: '300px',
  },
};

const Documentation = () => {
  return (
    <PublicLayout path='/documentation' title='API Documentation' >
      <div className="min-h-[calc(100vh-130px)]">
        <RedocStandalone specUrl={process.env.NEXT_PUBLIC_API_DOC_URL} options={{ theme }} />
      </div>
    </PublicLayout>
  );
};

export default Documentation;
