import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      dispatch({ type: 'RESET_STORE' });
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
