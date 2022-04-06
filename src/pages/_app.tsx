import { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyle';
import theme from '../../styles/Theme';
import { GlobalNavigationBar } from '@components/GlobalNavigationBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Wrapper>
        <GlobalNavigationBar/>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
`;
