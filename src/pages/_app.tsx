import { NextPage } from "next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "react-image-lightbox/style.css";
import "react-modern-drawer/dist/index.css";
import "ress";
import { SWRConfig } from "swr";
import fetcher from "libs/fetcher";
import "styles/globals.scss";
import "styles/mq-settings.scss";
import "styles/react-image-lightbox.scss";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            zIndex: 10001,
          },
        }}
      />
      <NextNProgress />
    </SWRConfig>
  );
}

export default MyApp;
