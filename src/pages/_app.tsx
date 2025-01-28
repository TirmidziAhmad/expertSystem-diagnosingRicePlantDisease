import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from '@/components/ui/provider';
import { Theme } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Theme appearance='light'>
        <Component {...pageProps} />
      </Theme>
    </Provider>
  );
}
