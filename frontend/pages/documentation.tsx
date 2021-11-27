import { RedocStandalone } from 'redoc';
import { withPublicLayout } from '@components/hof/with-public-layout';

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
    <div className="min-h-[calc(100vh-130px)]">
      <RedocStandalone specUrl={process.env.NEXT_PUBLIC_API_DOC_URL} options={{ theme }} />
    </div>
  );
};

export default withPublicLayout(Documentation, { path: '/documentation', title: 'API Documentation' });
