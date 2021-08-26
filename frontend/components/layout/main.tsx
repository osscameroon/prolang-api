import { Fragment, PropsWithChildren } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

type MainLayoutProps = {};

const MainLayout = ({ children }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <Fragment>
      <Head>
        <title>Wedding - Eric x Ursule</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Backoffice for managing guests and events of the wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="main">{children}</div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default MainLayout;
