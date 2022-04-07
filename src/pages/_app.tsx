import '@styles/reset.scss'

import { AppProps } from 'next/app';
import { ManagedUIContext } from '@components/ui/context';
import { FC } from 'react';

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
