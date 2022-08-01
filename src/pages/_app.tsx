import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "react-image-lightbox/style.css";
import "react-modern-drawer/dist/index.css";
import "ress";
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
    <>
      {getLayout(<Component {...pageProps} />)}{" "}
      <Toaster position="bottom-center" />
    </>
  );
}

export default MyApp;
