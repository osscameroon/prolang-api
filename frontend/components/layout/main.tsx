import { Fragment, PropsWithChildren } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

type Props = {};

const MainLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <Fragment>
      <Head>
        <title>Prolang</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A web interface to manage programming languages data" />
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

export { MainLayout };
