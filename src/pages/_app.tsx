import '@styles/reset.scss';

import { AppProps } from 'next/app';
import { FC } from 'react';
import { ManagedUIContext } from '@components/ui';

const Noop: FC = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  );
}
